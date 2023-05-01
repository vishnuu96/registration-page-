const blog=[]
let user={
    userName:'yash',
    lastActivity:'29th of  march'
}
function lastActivity(){
       return new Promise((resolve, reject) => {
        setTimeout(()=>{
          user.lastActivity = new Date().getTime()
           resolve(user.lastActivity)
        },1000)
       })
}

function create1stBlog(post) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            blog.push(post);
            const error=false
            if(!error){
                resolve(post)
                
            }else{
                reject('error:something went wrong');
            }
           
        }, 1000)
    }) 
}
// function create2ndBlog(post) {
//     return new Promise( (resolve, reject) => {
//         setTimeout( () => {
//             blog.push(post);
//             const error=false
//             if(!error){
//                 resolve(post)
//             }else{
//                 reject('error:something went wrong');
//             }
           
//         }, 2000)
//     }) 
// }
function deletePost(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(blog.length!==0){
                let deletedpost=blog.pop()
                resolve(deletedpost)
            }else{
                reject('array is empty now')
            }
        },1000)
    })
}
function getPost(){
    setTimeout(()=>{
        let output= ''
        blog.forEach((post,index)=>{
        //  output+=`<li>${post.title}</li>`
        output+= " "+post.title
        
        })
        // document.body.innerHTML=output
        console.log(output)
       },1000)
}


Promise.all([create1stBlog({title:'post one',body:'this is post one'}),lastActivity()]).then(([value,value1])=>{
    console.log([value,value1])
}).then(()=>{
    Promise.all([create1stBlog({title:'post two',body:'this is post two'}),lastActivity()]).then(([value,value2])=>{
            console.log([value,value2])
        }).then(()=>{
            Promise.all([create1stBlog({title:'post three',body:'this is post three'}),lastActivity()]).then(([value,value2])=>{
                console.log([value,value2])
            }).then(()=>{
                getPost()
            })
            .then(()=>{
                deletePost().then(()=>{
                    getPost()
                })
            })
        })
})

