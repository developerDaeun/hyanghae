/**
 *
 * User
 * User Entity
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-07
 * 마지막 수정일 2022-03-15
 **/
package com.idle.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "user")
@NoArgsConstructor
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    @Column(name = "u_seq")
    Long userSeq;

    @Column(name = "u_id", unique = true)
    String userId;

    @Column(name = "u_nickname", nullable = false)
    String userNickname;

    @Column(name = "u_pw", nullable = false)
    String userPw;

    @Column(name = "u_email", nullable = false)
    String userEmail;

    @Column(name = "u_type", nullable = false)
    String userType;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<Survey1> Survey1List = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<Survey2> survey2List = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<Survey3> survey3List = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<Review> reviewList = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<LikePerfume> likePerfumeList = new HashSet<>();

    @Builder
    public User(String userId, String userNickname, String userPw, String userEmail, String userType) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.userPw = userPw;
        this.userEmail = userEmail;
        this.userType = userType;
    }

    public User updateUserNickname(String userNickname) {
        this.userNickname = userNickname;

        return this;
    }


}

