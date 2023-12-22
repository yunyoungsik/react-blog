import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const RepleWrite = (props) => {
    const [reple, setReple] = useState("");
    const user = useSelector((state) => state.user);

    const SubmitHandler = (e) => {
        e.preventDefault();

        if (!reple) {
            return alert("댓글 내용을 작성해주세요.");
        }
        let body = {
            reple: reple,
            uid: user.uid,
            postId: props.postId,
        }
        axios.post("/api/reple/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("댓글 작성에 성공했습니다.");
                    window.location.reload();
                } else {
                    alert("댓글 작성에 실패했습니다.");
                }
            }
            )
    }
    return (
        <div>
            <form>
                <input
                    style={{ border: "1px solid #000", padding: "10px 20px" }}
                    type='text'
                    value={reple}
                    onChange={(e) => { setReple(e.currentTarget.value) }}
                />
                <button
                    type='submit'
                    onClick={(e) => { SubmitHandler(e) }}
                >댓글쓰기</button>
            </form>
        </div>
    )
}

export default RepleWrite