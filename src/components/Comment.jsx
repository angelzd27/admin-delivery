import { useEffect, useLayoutEffect, useState } from 'react'
import { socket } from '../services/master'
import { BD_ACTION_GET } from '../services/master'
import moment from 'moment'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import FavoriteIcon from '@mui/icons-material/Favorite'
// import { Rating } from '@mui/material'
// import styled from '@emotion/styled'
// import { comments } from '../services/comments'

// const StyledRating = styled(Rating)({
//     '& .MuiRating-iconFilled': {
//         color: '#ff6d75',
//     },
//     '& .MuiRating-iconHover': {
//         color: '#ff3d47',
//     },
// })

function Comment() {
    const [comment, setComment] = useState({})

    useEffect(() => {
        async function getComment() {
            const data = await BD_ACTION_GET('comments', 'last_comment')
            setComment(data.msg[0])
        }

        getComment()
    }, [])

    useLayoutEffect(() => {
        socket.on('comment', (data) => {
            setComment(data)
        })
        return () => {
            socket.off('comment')
        }
    }, [])

    return (
        <>
            <div className='flex flex-row shadow-lg p-5 bg-slate-50 gap-5 items-center rounded-lg max-w-[80%] select-none'>
                <img src={comment.picture} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col'>
                    <span className='font-bold'>@{comment.first_name} {comment.last_name} {comment.second_last_name}</span>
                    {/* <div className='flex items-center gap-2'>
                        <span className='text-sm font-montserrat font-bold'>{comment.ranking}</span>
                        <StyledRating
                            size='small'
                            value={comment.ranking}
                            readOnly
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                    </div> */}
                    <span className='text-gray-500 text-sm font-montserrat'>{moment(comment.create_date).format('MMMM DD, YYYY')}</span>
                    <span className='text-sm'>{comment.content}</span>
                </div>
            </div>
        </>
    )
}

export default Comment