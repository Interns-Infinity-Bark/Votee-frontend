// Defines the interface of the structure of a task
interface IUserTitleProps {
    id:number,
    nickName:string
}
interface IUserMainState{
    id:number,
    nickName:string
}

interface IUserVoteInfoState {
    title:string,
    content:any,
    private:boolean,
    password:string,
    anonymous:boolean,
    endAt:Date,
}