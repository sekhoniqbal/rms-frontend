export default function getAPIServerURL(){
    return process.env.NODE_ENV === 'development'?process.env.REACT_APP_DEV_API_SERVER_URL : process.env.REACT_APP_API_SERVER_URL;
}