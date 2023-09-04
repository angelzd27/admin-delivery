import { comments } from '../services/comments'
import { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Rating } from '@mui/material'
import styled from '@emotion/styled'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
})

function Comment() {
    const [dataIndex, setDataIndex] = useState(0);
    const [data, setData] = useState(comments[dataIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (dataIndex + 1) % comments.length;
            setDataIndex(nextIndex);
            setData(comments[nextIndex]);
        }, 8000)

        return () => clearInterval(intervalId);
    }, [dataIndex]);

    return (
        <>
            <div className='flex flex-row shadow-lg p-5 bg-slate-50 gap-5 items-center rounded-lg max-w-[80%] select-none'>
                <img src={data.image_url} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col'>
                    <span className='font-bold'>@ {data.username}</span>
                    <div className='flex items-center gap-2'>
                        <span className='text-sm font-montserrat font-bold'>{data.ranking}</span>
                        <StyledRating
                            size='small'
                            value={data.ranking}
                            readOnly
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                    </div>
                    <span className='text-sm'>{data.comment}</span>
                </div>
            </div>
        </>
    )
}

export default Comment