import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase.js';

const Userpage = () => {
    const [currentImage, setCurrentImage] = useState("");

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const ImageUpload = (e) => {
        const formData = new FormData();
        formData.append("file", (e.target.files[0]));

        axios
            .post("/api/user/profile/img", formData)
            .then((response) => {
                console.log(response);
                setCurrentImage(response.data.filePath);
            })
    }

    const SaveProfile = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().currentUser.updateProfile({
                photoURL: currentImage,
            })
        } catch (err) {
            return alert("프로필 저장 실패");
        }

        let body = {
            photoURL: currentImage,
            uid: user.uid,
        }
        axios.post("/api/user/profile/update", body)
            .then((response) => {
                if (response.data.success) {
                    alert("프로필 저장에 성공했습니다.");
                    window.location.reload();
                } else {
                    return alert("프로필 저장에 실패했습니다.");
                }
            })
    }

    useEffect(() => {
        if (user.isLoading && !user.accessToken) {
            navigate("/login");
        } else {
            setCurrentImage(user.photoURL);
        }
    }, [user])

    return (
        <div>
            <form className='mypage'>
                <label htmlFor="profile">
                    <input name='profile' id='profile' type="file" accept='image/*' onChange={(e) => ImageUpload(e)} />
                    <Avatar
                        size='100'
                        round={true}
                        src={currentImage}
                    />
                </label>
                <button onClick={(e) => SaveProfile(e)}>업로드</button>
            </form>
        </div>
    )
}

export default Userpage