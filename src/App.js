import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {

    const [allCategories, setAllCategories] = useState();
    const [activeCategory, setActiveCategory] = useState();
    const [questionFormText, setQuestionFormText] = useState('');


    const fetchQuestionsForCategory = async () => {
        let questions = await fetch(`http://localhost:3000/api/categories/${activeCategory.id}/questions`)
        questions = await questions.json()
        console.log('questions', questions)
        // setAllCategories(categories)
    };

    useEffect(() => {
        fetchQuestionsForCategory()
    }, [activeCategory])

    const fetchCategories = async () => {
        let categories = await fetch('http://localhost:3000/api/categories')
        categories = await categories.json()
        setAllCategories(categories)
    };

    // run some code that runs once when the page loads up
    useEffect(() => {
        console.log('this code will run only once when the page loads up!')
        fetchCategories()
    }, [])

    const onQuestionSubmit = async () => {
        // POST request
        let q = await fetch(`http://localhost:3000/api/categories/${activeCategory.id}/questions`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({questionTxt: questionFormText})
        })
    };


  return (
    <>
      <h1>App</h1>

        <h1>All Categories</h1>
        <h1>Active Category: {JSON.stringify(activeCategory)}</h1>
        <h1>questionFormText: {questionFormText}</h1>

        {activeCategory && <>
            <input type="text"
                   value={questionFormText}
                   onChange={(event) => setQuestionFormText(event.currentTarget.value)}
                   placeholder={'Enter Question text'}/>
            <button onClick={onQuestionSubmit}>Submit</button>
        </>}

        <ul>
            {allCategories && allCategories.map((category, idx) => {
                return <li key={idx} onClick={() => setActiveCategory(category)} >{category.name}</li>
            })}
        </ul>
    </>
  );
}

export default App;
