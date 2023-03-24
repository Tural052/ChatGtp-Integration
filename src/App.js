import React, { useEffect, useState } from "react";
import openai from "./openai.config";
import Button from './button.svg'
const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [index,setIndex] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function newSetRequestHeader(
      key,
      val
    ) {
      if (key.toLocaleLowerCase() === "user-agent") {
        return;
      }
      setRequestHeader.apply(this, [key, val]);
    };


    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputText,
      max_tokens: 2048,
      temperature: 1,
    });
    const parsableJSONresponse = response.data.choices[0].text;
    setOutputText(parsableJSONresponse);
    
  };

  useEffect(() =>{
    if(!outputText) return;
    setQuestions([...questions, {inputText, outputText}]);
    setIndex(index+1);
    setOutputText('')
    setInputText('')
    console.log(questions)
  },[outputText])

  const renderedQuestions = questions.map((q) =>{
    return(
      <li key={index}>
        <span>{q.inputText}</span>
        <span>{q.outputText}</span>
      </li>
    )
  })
  return (
    <div className="container">
      <div className="answers">
        <ul>
          {renderedQuestions}
        </ul>
      </div>
      <div className="questions">
        <form onSubmit={handleSubmit}>
        <div className="Message">
          <input
            title="Write Message"
            placeholder="Message.."
            className="MsgInput"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <img src={Button} className="SendSVG"/>
          <span className="l"></span>
        </div>
        </form>
      </div>
    </div>
  );
};

export default App;
