/*
리뷰 리스트
리뷰 리스트
@author Wendy
@version 1.0.0
생성일 2022-03-17
마지막 수정일 2022-03-29
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiDeletePerfumeReview, apiGetPerfumeReview } from "../../api/perfume";
import { apiUserLookUp } from "../../api/user";
import styles from "./reviewList.module.css";
import Review from "./review";
import { useAppSelector } from "../../reducers/hooks";
import Pagination from "./pagination";
interface ReviewInterface {
  reviewContent: string;
  reviewScore: number;
  userNickname: string;
}
const ReviewList = () => {
  const [data, setData] = useState([] as Array<ReviewInterface>);
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const token = useAppSelector((state) => state.authReducer.token);

  // 유저 닉네임 받아오기
  useEffect(() => {
    if (token) {
      apiUserLookUp(token)
        .then((res) => {
          setUserName(res.data.userNickName);
        })
        .catch((err) => {});
    }
  }, [token]);

  //댓글 편집 여부
  const changeEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  // 댓글 삭제
  const onDelete = (e) => {
    if (token) {
      e.preventDefault();
      apiDeletePerfumeReview(router.query.id as string, token)
        .then((res) => {
          alert("삭제되었습니다.");
          getReview();
        })
        .catch((err) => {
          console.log(err);
        });
      getReview();
    }
  };

  // 댓글 가져오기
  const getReview = () => {
    apiGetPerfumeReview(router.query.id as string, 1, 1)
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.totalPages);
        setData(res.data.reviewList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getReview();
    }
  }, [router, editMode]);

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Reviews</h1>
      {data.length == 0 && (
        <h2 className={styles.content}>There are no review.. </h2>
      )}
      {data.length > 0 && (
        <label htmlFor="limit">
          <span className={styles.content}>페이지 당 표시할 소식 수</span>
          <select
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
          </select>
        </label>
      )}

      <ul className={styles.myList}>
        {data &&
          data.map((d) => (
            <li key={d.userNickname}>
              {!editMode && (
                <div className={styles.oneReview}>
                  <p className={styles.content}>
                    {d.userNickname} : {`${d.reviewContent}`} (
                    {`${d.reviewScore}`})
                  </p>
                  {d.userNickname === userName && (
                    <div className={styles.oneReview}>
                      <button
                        className={styles.editBtn}
                        onClick={changeEditMode}
                      >
                        Edit
                      </button>
                      <form onSubmit={onDelete}>
                        <button className={styles.delBtn}>Delete</button>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {editMode && (
                <div>
                  {d.userNickname === userName && (
                    <Review
                      isEditMode="true"
                      setEdit={setEditMode}
                      star={`${d.reviewScore}`}
                      content={d.reviewContent}
                    />
                  )}
                  {d.userNickname !== userName && (
                    <div>
                      {d.userNickname} : ${d.reviewScore}:{" "}
                      {`${d.reviewContent}`}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
      {data.length !== 0 && (
        <footer>
          <Pagination
            total={total}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      )}
    </article>
  );
};

export default ReviewList;
