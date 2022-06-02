export const placesQuery = `
    query PLACES {
                        places(province:"istanbul") {
                                name
                                logo,
                                category,
                                photos,
                                province
                            }
                        }
`

export const createPlaceQuery = `
    mutation CREATE_PLACE {
        createPlace(
                place: {
                name: "demo"
                logo: "https://cdn-icons-png.flaticon.com/512/4711/4711382.png",
                photos:["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80", "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"]
                province: "izmir"
                category: restaurant
            }
        ){
                _id
                name,
                province,
                logo,
                category,
                photos
            }
        }
`

export const commentsQuery = (placeId: string) => `
    query COMMENTS {
        listComments(placeId: "${placeId}"") {
            username
            profilePhoto
            body
            rate
            placeId
            createdAt
        }
    }
`

export const createCommentQuery = (placeId: string) => `
    mutation CREATE_COMMENT {
    createComment(
            placeId: "${placeId}"
            comment: {
            username: "demo"
            body: "demo comment"
            rate: 5
            }
        ) {
            _id
            username
            profilePhoto
            body
            rate
            placeId
            createdAt
        }
    }
`

export const averagePointQuery = (placeId: string) => `
    query AVERAGE_POINT {
        averagePoint(placeId: "${placeId}") {
            count,
            avg
        }
    }
`

export const commentPercentageQuery = (placeId: string) => `
    query COMMENT_PERCENTAGE {
        commentPercentage(placeId: "${placeId}") {
            per,
            rate
      }
    }
`

export const lastCommentsQuery = `
    query LAST_COMMENTS {
        lastComments {
            place {
                name,
                logo
            }
            username
            profilePhoto
            body
            rate
            placeId
            createdAt
        }
    }
`