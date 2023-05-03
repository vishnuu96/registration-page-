const blog=[]
let user={
    userName:'yash',
    lastActivity:'29th of  march'
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
// async function
async function  harry(){


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
try{
let [post1,activity1]=await Promise.all([create1stBlog({title:'post one',body:'this is post one'}),lastActivity()])
console.log([post1,activity1])
}catch(e){
    console.log(e)
}
try{
let [post2,activity2]=await Promise.all([create1stBlog({title:'post two',body:'this is post two'}),lastActivity()])
console.log([post2,activity2])
}catch(e){
    console.log(e)
}
try{
let [post3,activity3]=await Promise.all([create1stBlog({title:'post three',body:'this is post three'}),lastActivity()])
console.log([post3,activity3])
}catch(e){
    console.log(e)
}
getPost()
try{
let delPost=await deletePost()
console.log(delPost)

}catch(e){
console.log(e)
}
}
harry().then(()=>{
    getPost()
})
