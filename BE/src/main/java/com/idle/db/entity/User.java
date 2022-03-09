/**
 *
 * User
 * User Entity
 *
 * @author David
 * @version 1.0.0
 * 생성일 2022-03-07
 * 마지막 수정일 2022-03-07
 **/
package com.idle.db.entity;

import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data   // Getter, Setter 등 lombok
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

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Survey1> Survey1List = new HashSet<>();

    @Builder
    public User(String userId, String userNickname, String userPw, String userEmail) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.userPw = userPw;
        this.userEmail = userEmail;
    }

    public User updateUserNickname(String userNickname) {
        this.userNickname = userNickname;

        return this;
    }


}
