//rfce로 function 편리하게 만들 수 있음 (es7 설치해야함)
import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import { API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Sections/MovieInfo';
import { useParams } from 'react-router-dom';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    // const movieId = props.match.params.movieId
    const {movieId} = useParams()
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [ActorToggle, setActorToggle] =useState(false)
    const movieVariable = {
        movieId: movieId
    }

    const [MovieDetail, setMovieDetail] = useState([])
    // const [Comments, setComments] = useState()

    useEffect(() => {

        // console.log(props.match)
    
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR&page=1`;
        //let endpointInfo = `${API_URL}movie/${movieId}/?api_key=${API_KEY}` -> 위에 꺼로 수정

        
        axios.post('/api/comment/getMovieDetail', movieVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.movieDetail)
                    // setMovieDetail(response.data.movieDetail)
                } else {
                    alert('Failed to get comments Info')
                }
            })
            
            axios.post('/api/comment/getComments',movieVariable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.comments)
                    //setComments -> setCommentLists으로 변경
                    setCommentLists(response.data.comments)
                }else{
                    alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
                }
            })

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setMovie(response)

        })
    
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })

    }, [])

        const toggleActorView = () => {
            setActorToggle(!ActorToggle)
        }

        const updateComment = (newComment) => {
            setCommentLists(CommentLists.concat(newComment))
        }

    return ( 
        <div>
        
            {/* Header */}

                <MainImage 
                    image = {`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                    title = {Movie.original_title}
                    text = {Movie.overview}
                />
                
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
            
            {/* 오른쪽 상단 좋아요 버튼 위치 */}
                <div style={{ display: 'flex', justifyContent:'flex-end' }}>
                   <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div> 

                {/* Movie Info 영화 정보 가져오기 */}

                <MovieInfo
                    movie={Movie}
                />

                <br/>

                {/* Actors Grid */}
                {/* 맨 아래 toggle Actor View 위치 */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View</Button>
                </div>

                {ActorToggle &&
                //강의는 16인데 제 화면에는 13이 맞아서 13으로 설정해놓음
                <Row gutter={[13, 13]} >
    
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                // landingPage -> 이거 없어야 해요
                                image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                chracterName={cast.name} />
                        </React.Fragment>
                        ))}

                    {/* {
                    !LoadingForCasts ? Casts.map((cast, index) => (
                        cast.profile_path &&
                        <GridCards
                            image={cast.profile_path ?
                                `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                            characterName={cast.name}
                        />)) :
                        <div>loading...</div>
                        } */}
                    </Row>
                }
                 <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes movie movieId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                {/* CommentLists = {Comments} 수정 */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} 
                postId={movieId} refreshFunction={updateComment} />
                
                <comments CommentLists={Comments} postId={props.postId} />
            </div>

        </div>
    )
}

export default MovieDetail