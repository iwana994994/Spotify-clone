export interface Song{
    _id:string,
    title:string,
    albumId:string|null,
    duration:number,
    imageUrl:string,
    audioUrl:string
    createdAt:string,
    updatedAt:string
}
export interface Album{
_id:string,
title:string,
imageUrl:string,
artist:string,
releaseYear:number,
songs:Song[],
createdAt:Date,
updatedAt:Date


}