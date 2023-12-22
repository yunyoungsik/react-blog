import React, { useEffect, useState } from 'react'
import PostDetail from './PostDetail'
import RepleArea from '../reple/RepleArea'
import axios from 'axios';
import { useParams } from 'react-router-dom'

const PostArea = () => {
    const [postInfo, setPostInfo] = useState({});
    const [flag, setFlag] = useState(false);

    let params = useParams();

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post('/api/post/detail', body)
            .then((response) => {
                console.log(response);
                setPostInfo(response.data.post);
                setFlag(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum]);

    return (
        <div>
            {flag ? (
                <>
                    <PostDetail postInfo={postInfo} />
                    <RepleArea postId={postInfo._id} />
                </>
            ) : (
                <div>
                    로딩중
                </div>
            )}
        </div>
    )
}

export default PostArea