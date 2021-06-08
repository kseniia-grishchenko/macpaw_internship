import axios from "axios";

async function getImages(params) {
    try{
        const respImages = await axios.get(`${process.env.REACT_APP_API_URL}images/search`,
            {
                params: params
            })
        return respImages.data;
    } catch(error){
        console.log(error);
    }

}

async function getBreeds(){
    try{
        const respBreeds = await axios.get(`${process.env.REACT_APP_API_URL}breeds/`,
            {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY
                }
            });
        return respBreeds.data;
    } catch(error){
        console.log(error);
    }
}

async function addImageToLikes(image_id){
    try{
        const formData = {
            image_id: image_id,
            value: 1
        }

        const resp = await axios.post(`${process.env.REACT_APP_API_URL}votes`, formData, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json',
                'Host': 'api.thedogapi.com',
            },
        })
        return resp.data
    } catch (error){
        console.log(error)
    }
}

async function addImageToDislikes(image_id){
    try{
        const formData = {
            image_id: image_id,
            value: 0
        }

        const resp = await axios.post(`${process.env.REACT_APP_API_URL}votes`, formData, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json',
                'Host': 'api.thedogapi.com',
            },
        })
        return resp.data
    } catch (error){
        console.log(error)
    }
}

async function addImageToFavourites(image_id){
    try{
        const formData = {
            image_id: image_id
        }

        const resp = await axios.post(`${process.env.REACT_APP_API_URL}favourites`, formData, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json',
                'Host': 'api.thedogapi.com',
            },
        })
        return resp.data
    } catch (error){
        console.log(error)
    }
}

async function deleteImageFromFavourites(image_id){
    try{
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        const fav = favourites.filter(favourite => favourite.image_id === image_id)
        const resp = await axios.delete(`${process.env.REACT_APP_API_URL}favourites/${fav[0].id}`,  {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json',
                'Host': 'api.thedogapi.com',
            },
        })
        return resp.data

    }catch(error){
        console.log(error)
    }
}

async function getFavourites(){
    try{
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}favourites`,
            {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY
                }
            })
        localStorage.setItem('favourites', JSON.stringify(resp.data));
        return resp.data
    }catch (error){
        console.log(error)
    }
}

async function getVotes(value){
    try{
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}votes`,
            {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY
                }
            })
        return resp.data.filter(like => like.value === value);
    }catch (error){
        console.log(error)
    }
}

async function deleteImageFromVotes(image_id, vote_type){
    try{
        const votes = JSON.parse(localStorage.getItem(vote_type));
        const image = votes.filter(vote => vote.image.id === image_id)
        const resp = await axios.delete(`${process.env.REACT_APP_API_URL}votes/${image[0].vote_id}`,  {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json',
                'Host': 'api.thedogapi.com',
            },
        })
        return resp.data

    }catch(error){
        console.log(error)
    }
}

export {getImages, getBreeds, addImageToLikes, addImageToDislikes, addImageToFavourites, deleteImageFromFavourites, getFavourites, getVotes, deleteImageFromVotes};