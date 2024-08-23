import React from 'react'

type Props = {}

const AboutPage = async (props: Props) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    const todos = await data.json()
    console.log(todos)
    return <div>Count Todos =&gt; {todos.length}</div>
}

export default AboutPage
