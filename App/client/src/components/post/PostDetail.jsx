import React from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'

const PostDetail = (props) => {
    let navigate = useNavigate();
    let params = useParams();

    const DeleteHandler = () => {
        if (window.confirm('정말로 삭제하기겠습니까?')) {
            let body = {
                postNum: params.postNum,
            }
            axios
                .post('/api/post/delete', body)
                .then((resonpse) => {
                    if (resonpse.data.success) {
                        alert('게시글이 삭제되었습니다.')
                        navigate('/list')
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert('게시글 삭제가 실패했습니다.')
                })
        }
    }
    return (
        <div className='detail__wrap'>
            <div className='detail__title'>
                <h3>{props.postInfo.title}</h3>
                <span className='auth'>
                    <Avatar
                        size='30'
                        round={true}
                        src={props.postInfo.author.photoURL}
                    />
                    {props.postInfo.author.displayName}
                </span>
            </div>
            <div className='detail__content'>
                {props.postInfo.image ? <img src={props.postInfo.image} alt={props.postInfo.title} /> : null}
                {props.postInfo.content}
            </div>
            <div className='detail__btn'>
                <Link to={`/modify/${props.postInfo.postNum}`}>
                    수정
                </Link>
                <button onClick={() => DeleteHandler()}>삭제</button>
                <Link to='/list'>목록</Link>
            </div>
        </div>
    )
}

export default PostDetail