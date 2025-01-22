const input = document.getElementById('name');
const welcomeDiv =document.getElementById('welcome');
const quizDiv = document.getElementById('quizzes'); 
const testDiv = document.getElementById('quiz-content'); 


input.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        if(input.value === ''){ 
            alert('present enter yor name')
        }
        else{
        welcomeDiv.style.display = 'none';
        quizDiv.style.display = 'block';
        showquiz();
        input.value = '';
        }
    }   
});
async function showquiz(){
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple');
        const data = await response.json();
        data.results.forEach((questions,index)=>{
            const quizQuestion = document.createElement('div');
            quizQuestion.classList.add('question');
            quizQuestion.innerHTML = `
            <h3>Question${index+1}: ${questions.question}</h3>
            <ul>
            ${[...questions.incorrect_answers,questions.correct_answer]
            .sort(()=> Math.random()- 0.5)
            .map(answer =>`<li><input type="radio" name="question${index+1}" value="${answer}">${answer}</li>`).join('')}
            </ul>
            `;
            testDiv.appendChild(quizQuestion);
            const buttonDiv = document.createElement('div');
            const checkAnswer = document.createElement('button');
            checkAnswer.textContent = 'Check Answer';
            buttonDiv.appendChild(checkAnswer);
            testDiv.appendChild(buttonDiv);
            checkAnswer.addEventListener('click',()=>{
                const selectedAnswer = document.querySelector(`input[name='question${index+1}']:checked`);
                if (selectedAnswer) {
                    if (selectedAnswer.value !== questions.correct_answer) {
                        checkAnswer.innerText = 'Wrong Answer';
                        checkAnswer.style.cssText = 'background-color: #660303; color: #d8d8d8; padding: 7px; font-size: 14px; border:1px solid transparent;';
                    } else {
                        checkAnswer.innerText = 'Right Answer';
                        checkAnswer.style.cssText = 'background-color: #013f01; color: #d8d8d8; padding: 7px; font-size: 14px; border:1px solid transparent;';
                    }
                    const radioButtons = document.querySelectorAll(`input[name="question${index+1}"]`);
                    radioButtons.forEach(radio => radio.disabled = true);
                } else {
                    alert('Please select an answer.');
                }
            })
        })
        const resultButton = document.createElement('button');
        resultButton.textContent = 'Show Result';
        resultButton.style.cssText = 'background-color:#9eae9e; color: #000; padding: 7px; font-size: 14px; border:1px solid transparent; margin:10px auto;';
        testDiv.appendChild(resultButton);
        
    }
    catch (error) {
        console.error('Error fetching quiz questions:', error) ;
    }   
    
}