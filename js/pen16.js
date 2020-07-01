/* Цель: Убрать все объекты с типом additional, а для basic очки уменьшить в двое.

Изменить необходимо исходный массив*/



// const arr = [{lesson: 2, type: 'additional', points: 4},{lesson: 1, type: 'basic', points: 2},3,
//             {lesson: 2, type: 'additional', points: 4},{lesson: 1, type: 'basic', points: 2},
//             6,7,{lesson: 1, type: 'basic', points: 2},{lesson: 2, type: 'additional', points: 4}];

// console.log(arr);

const myLesson = [
    {lesson: 1, type: 'basic', points: 2},
    {lesson: 2, type: 'additional', points: 4},
    {lesson: 3, type: 'basic', points: 6},
    {lesson: 4, type: 'additional', points: 3},
    {lesson: 5, type: 'basic', points: 4},
    {lesson: 6, type: 'basic', points: 2},
    {lesson: 7, type: 'additional', points: 2},
    {lesson: 8, type: 'basic', points: 6},
    {lesson: 9, type: 'basic', points: 4},
    {lesson: 10, type: 'basic', points: 6},
    {lesson: 11, type: 'additional', points: 5}, 
    {lesson: 12, type: 'basic', points: 2}, 
    {lesson: 13, type: 'additional', points: 2}, 
    {lesson: 14, type: 'basic', points: 4},
    {lesson: 15, type: 'additional', points: 1},
    {lesson: 16, type: 'additional', points: 7}
];

console.log(myLesson);


    for (let i = 0; i < myLesson.length; i ++) {
        myLesson[i].type === 'additional'  ?
        (myLesson.splice(i, 1),
            i-- ) : 
        (myLesson[i].points = myLesson[i].points / 2 );
    }
    console.log(myLesson.points);
    
// const map = new Map();

// function degree(){
//     for (let i = 0; i < arr.length; i++){
//         if(arr[i].type === 'basic'){
//             arr[i].points / 2;
//             console.log(arr[i].points);
//             map.set(arr[i].points / 2);
//         }
//         return arr[i].points / 2;
//     }
//     console.log(map);
    








// const myLesson = [
//     {lesson: 1, type: 'basic', points: 2},
//     {lesson: 2, type: 'additional', points: 4},
//     {lesson: 3, type: 'basic', points: 6},
//     {lesson: 4, type: 'additional', points: 3},
//     {lesson: 5, type: 'basic', points: 4},
//     {lesson: 6, type: 'basic', points: 2},
//     {lesson: 7, type: 'additional', points: 2},
//     {lesson: 8, type: 'basic', points: 6},
//     {lesson: 9, type: 'basic', points: 4},
//     {lesson: 10, type: 'basic', points: 6},
//     {lesson: 11, type: 'additional', points: 5}, 
//     {lesson: 12, type: 'basic', points: 2}, 
//     {lesson: 13, type: 'additional', points: 2}, 
//     {lesson: 14, type: 'basic', points: 4},
//     {lesson: 15, type: 'additional', points: 1},
//     {lesson: 16, type: 'additional', points: 7},
// ];
// console.log(myLesson);


// for (let i =0; i < myLesson.length; i ++) {
//     if(myLesson[i].type === 'additional'){
        
//         myLesson.splice(i, 1);
//         console.log(i);
//     }
// }


// for (let i =0; i < myLesson.length; i ++) {
//     if(myLesson[i].type  === "additional"){
//         myLesson.splice(i, 1);
        
//         // delete myLesson[i];
//         console.log(myLesson[i]);
//         console.log(i);
//     }
// }
    
//     // myLesson[i].type  === "additional" ;
//     // ? myLesson.splice(myLesson[i]) : i++;
//     // console.log(myLesson[i]);
//     console.log(myLesson);
//     // console.log(i);
    
// }