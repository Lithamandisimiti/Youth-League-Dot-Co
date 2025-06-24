import { posts, profile } from '../actions';
import { api, fetch, queryString, nodeHost } from '../actions';
import { setUserImage } from '../profile/profile';
import { PostTypes } from '../../../helpers/constants';

export const SET_POSTING_PENDING = 'SET_POSTING_PENDING';
export const SET_POSTING = 'SET_POSTING';
export const SET_POSTING_BLOG = 'SET_POSTING_BLOG';
export const SET_POSTED_BLOG = 'SET_POSTED_BLOG';
export const SET_POSTING_SUCCESS = 'SET_POSTING_SUCCESS';
export const SET_POSTING_ERROR = 'SET_POSTING_ERROR';
export const SET_POSTING_FAILURE = 'SET_POSTING_FAILURE';

export const OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL';
export const OPEN_POSTING_MODAL = 'OPEN_POSTING_MODAL';
export const OPEN_NAV_POSTING_MODAL = 'OPEN_NAV_POSTING_MODAL';
export const CLOSE_POSTING_MODAL = 'CLOSE_POSTING_MODAL';

function setPosting(posts) {
  return { type: SET_POSTING, payload: posts };
}
function setPostingBlog(posts) {
  return { type: SET_POSTING_BLOG, payload: posts };
}
export function setPostedBlog(posts) {
  return { type: SET_POSTED_BLOG, payload: posts };
}
function setPostingPending(isPostsPending) {
  return { type: SET_POSTING_PENDING, payload: isPostsPending };
}
function setPostingSuccess(isPostsSuccess) {
  return { type: SET_POSTING_SUCCESS, payload: isPostsSuccess };
}
function setPostingError(postsError) {
  return { type: SET_POSTING_ERROR, payload: postsError };
}
function setPostingFailure(postsFailure) {
  return { type: SET_POSTING_FAILURE, payload: postsFailure };
}

export function openPostingModal(isOpen) {
  return (dispatch, getState) => dispatch({ type: OPEN_POSTING_MODAL, isOpen });
}
export function openProfileModal(isOpen) {
  return (dispatch, getState) => dispatch({ type: OPEN_PROFILE_MODAL, isOpen });
}

export function openNavPostingModal(isOpen) {
  return (dispatch, getState) =>
    dispatch({ type: OPEN_NAV_POSTING_MODAL, isOpen });
}

export function createPost(data) {
  let {
    type,
    file,
    title,
    description,
    categories,
    audioCoverFile,
    uploadFrom,
    song,
    artist,
    album,
  } = data;
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      dispatch(setPosting(true));
      const data = new FormData();
      data.append('file', file);
      if (type != 'audio') data.append('folder', 'uploads');
      fetch(`${nodeHost}/api/upload/${type}`, {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem('userToken')}`,
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.status == 'success') {
            const id = localStorage.getItem('userId');
            let path_cover = '';

            if (type == 'video') path_cover = response['thumbnail'];
            if (type == 'audio' && audioCoverFile) {
              const dataCover = new FormData();
              dataCover.append('file', audioCoverFile);
              fetch(`${nodeHost}/api/upload/thumbnail`, {
                method: 'POST',
                body: dataCover,
                headers: {
                  Authorization: `Token ${localStorage.getItem('userToken')}`,
                },
              })
                .then(res => res.json())
                .then(res => {
                  if (res.status == 'success') {
                    path_cover = res.thumbnail;
                    const bodyData = {
                      id,
                      title: title,
                      description: description,
                      status: 'post',
                      type: type,
                      media_url: response[type],
                      cover_image: path_cover,
                      location: '',
                      media_song: song,
                      media_artists: artist,
                      media_album: album,
                      categories,
                    };
                    uploadFrom
                      ? (uploadFrom = uploadFrom)
                      : (uploadFrom = 'profile');
                    createPostFetch(dispatch, bodyData, uploadFrom);
                  }
                });
            } else {
              const bodyData = {
                id,
                title: title,
                description: description,
                status: 'post',
                type: type,
                media_url: response[type],
                cover_image: path_cover,
                location: '',
                media_song: song,
                media_artists: artist,
                media_album: album,
                categories,
              };
              uploadFrom ? (uploadFrom = uploadFrom) : (uploadFrom = 'profile');
              createPostFetch(dispatch, bodyData, uploadFrom);
            }
          }
        })
        .catch(error => {
          dispatch(setPostingFailure(error)), dispatch(setPosting(false));
        });
    }
  };
}

export function uploadProfilePicture(file) {
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      dispatch(setPosting(true));
      // var dataURL = canvas.toDataURL('image/jpeg', 0.5);
      const blob = dataURItoBlob(file);
      const data = new FormData();
      data.append('file', blob);
      data.append('folder', 'uploads');
      fetch(`${nodeHost}/api/upload/image`, {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Token ${localStorage.getItem('userToken')}`,
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.status === 'success') {
            const id = getState().authenticate.userId;
            const username = getState().authenticate.userName;
            const image = response.image;
            const bodyData = { id, image };
            fetch(api + 'api/update-user-image.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: queryString.stringify(bodyData),
            })
              .then(res => res.json())
              .then(res => {
                if (res == true) {
                  dispatch(setUserImage(image));
                }
                dispatch(profile(username));
                dispatch(setPosting(false));
                dispatch(openProfileModal(false));
              });
          }
        })
        .catch(error => {
          dispatch(setPostingFailure(error)), dispatch(setPosting(false));
        });
    }
  };
}
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

function createPostCategories(categories, id) {
  fetch(`${nodeHost}/api/posts/post-categories/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      categories: categories,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('userToken')}`,
    },
  })
    .then(response => response.json())
    .then(response => {})
    .catch(error => console.error(error));
}

function createPostFetch(dispatch, bodyData, uploadFrom) {
  const formData = new FormData();
  Object.keys(bodyData).map(key => {
    formData.append(key, bodyData[key]);
  });

  fetch(api + 'api/create-post.php', {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (uploadFrom !== null) {
        if (
          uploadFrom.toLowerCase() != 'explore' &&
          uploadFrom.toLowerCase() != 'category'
        ) {
          const url =
            uploadFrom.toLowerCase == 'profile'
              ? PostTypes.USER
              : PostTypes.ALL;
          dispatch(posts(url, localStorage.getItem('userName')));
        }
      }
      dispatch(setPosting(false));
      dispatch(openPostingModal(false));
      dispatch(openNavPostingModal(false));
      createPostCategories(bodyData.categories, res);
    })
    .catch(error => {
      console.error({ error });
      dispatch(setPostingFailure(error));
    });
}
export function createBlogPost(blog) {
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      dispatch(setPostingBlog(true));
      dispatch(setPostedBlog(false));
      const bodyData = {
        id: localStorage.getItem('userId'),
        title: '',
        description: blog,
        status: 'blog',
        type: '',
        media_url: '',
        cover_image: '',
        location: '',
        categories: '',
      };
      fetch(api + 'api/create-blog-post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify(bodyData),
      })
        .then(res => res.json())
        .then(res => {
          dispatch(posts(PostTypes.USER, localStorage.getItem('userName')));
          dispatch(setPostingBlog(false));
          dispatch(setPostedBlog(true));
        })
        .catch(error => dispatch(setPostingFailure(error)));
    }
  };
}

export function BlogPosted(state) {
  return (dispatch, getState) => dispatch(setPostedBlog(state));
}
