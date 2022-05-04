import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Section/MainImage';
import axios from 'axios';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import { Button } from 'antd' ;

function LandingPage() {

    const [Movies, setMovies] = useState([]) //console.log(response.results) -> 배열 형태, initail state를 배열로 설정
    const [MainMovieImage, setMainMovieImage] = useState(null) //제일 인기있는 영화의 이미지는 results[0]으로 갱신
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        // 인기있는 영화 가져오기 
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
            fetchMovies(endpoint)

    },[])

        const fetchMovies = (endpoint) => {
            fetch(endpoint) 
            .then(response => response.json()) //json 메소드를 이용해서 response로 가져오기
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results]) //원래있던 Movies에 이미지 추가할 때 마다 누적하기
                setMainMovieImage(response.results[0]) 
                setCurrentPage(response.page) 
            })
    }
    //loadmore 버튼 클릭 시 더 많은 이미지 가져오기
        const loadmoreItems = () => {
            //현재페이지에서 +1 씩 증가(누적시킴)
            const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}`; 
            fetchMovies(endpoint)

        }

    return (
        <div style= {{ width: '100%', margin: '0'}}>
            
            {/* Main image */}
            {MainMovieImage &&
                <MainImage 
                    image = {`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title = {MainMovieImage.original_title}
                    text = {MainMovieImage.overview}
                />
            }

            <div style= {{ width: '85%', margin: '1rem auto'}}>
                
                <h2>Movies by latest</h2>
                <hr/>

                {/* Movie Grid Cards //영화 포스터 사이즈*/}
                
                <Row gutter={[13, 13]} >
    
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title} 
                            />
                        </React.Fragment>
                    ))}

                
                </Row>
            

            </div>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button onClick={loadmoreItems}>Load More</Button>
            </div>

        </div>
    )
}

export default LandingPage
