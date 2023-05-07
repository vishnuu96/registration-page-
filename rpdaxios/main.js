// AXIOS GLOBALS
axios.defaults.headers.common['authorizaion']='some token'


// GET REQUEST
function getTodos() {

  //   axios({
  //     method:'get',
  //     url:'https://jsonplaceholder.typicode.com/todos',
  //     // in url we can add params limit
  //     params:{
  //       _limit:5
  //     }
  //     // this going to return a promise so add .then

  //   })
  //   .then(res=>showOutput(res))
  //   .then(err=>console.log(err))
  // }
  // or we can wite short form like this
  // |||||
  // axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => showOutput(res))
    .then(err => console.log(err))

}

// POST REQUEST
function addTodo() {

  // axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   // we are sending data we need data
  //   data:{
  //     title:"new todo",
  //     completed:false
  //   }
  //   // this going to return a promise so add .then
  // })
  // .then(res=>showOutput(res))
  // .then(err=>console.log(err))

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'new todo',
    completed: false
  })
    .then(res => showOutput(res))
    .then(err => console.log(err))
}


// PUT/PATCH REQUEST
function updateTodo() {
  // put will totally replace te entire resource where as patch will update incrementally
  // axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
  //   title:"updated todo",
  //   completed:true
  // })
  //   .then(res=>showOutput(res))
  //   .then(err=>console.log(err))

  axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    title: "updated todo",
    completed: true
  })
    .then(res => showOutput(res))
    .then(err => console.log(err))


}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .then(err => console.log(err))

}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    // .then(res=>{
    //   console.log(res[0])
    //   console.log(res[1])
    //   showOutput(res[1])
    // })
    .then(axios.spread((todos, posts) => {
      // showOutput(todos)
      showOutput(posts)
    }))
    .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: 'sometoken'
    }

  };
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'new todo',
      completed: false
    }, config)
    .then(res => showOutput(res))
    .then(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'hello world'
    },
    transformResponse: axios.dafaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase()
      return data
    })
  };
  axios(options).then((res) => {
    showOutput()
  });
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        // server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if(err.response.status===404){
          alert('error page is not found')
        }
      }
       else if(err.request){
        // the request was made but no resonse
        console.log(err.request)
      }
      else{
        console.error(err.message)
      }
    })

}

// CANCEL TOKEN
function cancelToken() {
  const source=axios.CancelToken.source()
//   const CancelToken = axios.CancelToken;
// const source = CancelToken.source();
    axios.get('https://jsonplaceholder.typicode.com/todos',{
      cancelToken:source.token
    }).then(res=>showOutput(res))
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log('Request canceled',thrown.message)
      }
    })
    if(true){
      source.cancel('request canceled')
    }
  
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use((config) => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
  return config;
}, (error) => {
  return Promise.reject(error)
})

// AXIOS INSTANCES
const axiosInstance=axios.create({
  // other custom settings
  baseURL:'https://jsonplaceholder.typicode.com'
})
// axiosInstance.get('/comments').then(res=>showOutput)

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);