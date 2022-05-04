import React from 'react'
import { Descriptions, Badge } from 'antd';

function MovieInfo(props) {

    let { movie } = props;
    
    return (
        <Descriptions title="Movie Info" bordered>
        {/* //     <Descriptions.Item label="제목">{movie.title}</Descriptions.Item>
        //     <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
        //     <Descriptions.Item label="상영시간(분)">{movie.runtime}</Descriptions.Item>
        //     <Descriptions.Item label="평점">{movie.vote_average}</Descriptions.Item>
        //     <Descriptions.Item label="키워드" span={2}>{movie.tagline}</Descriptions.Item>
        // </Descriptions> */}
        <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
            </Descriptions>
    )
}

export default MovieInfo
