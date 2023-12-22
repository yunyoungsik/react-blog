import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';

import moment from 'moment'
import 'moment/locale/ko'

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [sort, setSort] = useState("최신순");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let body = {
            sort: sort,
            searchTerm: searchTerm,
        }

        axios.post("/api/post/list", body)
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [sort])

    const SetTime = (a, b) => {
        if (a !== b) {
            return moment(b).format('YYYY MMMM Do, h:mm a') + "(수정)"
        } else {
            return moment(a).format('YYYY MMMM Do, h:mm a')
        }
    }

    const SearchHandler = () => {
        let body = {
            sort: sort,
            searchTerm: searchTerm,
        }

        axios.post("/api/post/list", body)
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className='login__header'>
                <h3>List</h3>
                <p>잠깐 글좀 확인할까?</p>
            </div>

            <div className='search'>
                <input type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            SearchHandler();
                        }
                    }}
                />
                <button onClick={() => SearchHandler()}>검색</button>
            </div >
            <div className='list__Btn'>
                <button onClick={() => setSort("최신순")}>최신순</button>
                <button onClick={() => setSort("인기순")}>인기순</button>
            </div>

            <div className='list__wrap'>
                {postList.map((post, key) => {
                    console.log(post)
                    return (
                        <div className='list' key={key}>
                            <span className='cate'>교육</span>
                            <h3 className='title'>
                                <Link to={`/detail/${post.postNum}`}>{post.title}</Link>
                            </h3>
                            <p className='desc'>{post.content}</p>
                            <div className='auth'>
                                <Avatar
                                    size='30'
                                    round={true}
                                    src={post.author.photoURL}
                                />
                                {post.author.displayName}
                            </div>
                            <div style={{ fontSize: "12px", marginTop: "6px" }}>
                                {SetTime(post.createdAt, post.updatedAt)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostList