'use strict;'

$(function () {
	var contentTest = $('#test').html()
	var variab =
	[
		{
			name: 'Вопрос №1',
			answer1: {
				text:'Вариант ответа №1',
				correct: "false"
				},
			answer2: {
				text:'Вариант ответа №2',
				correct: "true"
				},
			answer3: {
				text:'Вариант ответа №3',
				correct: "false"
				},
		},
		{
			name: 'Вопрос №2',
			answer1: {
				text:'Вариант ответа №1',
				correct: "true"
				},
			answer2: {
				text:'Вариант ответа №2',
				correct: "false"
				},
			answer3: {
				text:'Вариант ответа №3',
				correct: "false"
				},
		},
		{
			name: 'Вопрос №3',
			answer1: {
				text:'Вариант ответа №1',
				correct: "false"
				},
			answer2: {
				text:'Вариант ответа №2',
				correct: "false"
				},
			answer3: {
				text:'Вариант ответа №3',
				correct: "true"
				},
		}
	];

// START WORK WITH LOCALSTORAGE

	localStorage.setItem('logo',JSON.stringify(variab));
	var questions = localStorage.getItem('logo')
			questions = JSON.parse(questions);
			questions = {data:questions};

	var getTemplate = tmpl(contentTest,questions);
	$('body').append(getTemplate);

// NOTE: FINISH WORK WITH LOCALSTORAGE

// NOTE: ANALISE QUESTIONS AND ANSWERS
	var arrayInputs = [];
	var arrayCheckedInputs = [];
	var answers = [];
	var correctAnswers = [];
	var dataResults = {
			correctAnswers:'',
			allAnswers:''
		};

	for (var c = 0; c < variab.length; c++) {
			for (var b = 0; b < (Object.keys(variab[c]).length - 1); b++) {
				answers.push(variab[c]["answer"+(b+1)].correct)
			};
	};

 	$('.checkButton').on('click',function handlerIn () {
		if ($('input:checkbox')) {
			arrayInputs.push($('input:checkbox'))
			arrayInputs = arrayInputs[0];
		};
		for (var i = 0; i < arrayInputs.length; i++) {
			if ((arrayInputs[i].checked)) {
				arrayCheckedInputs.push(arrayInputs[i]);
			} else {
				arrayCheckedInputs.push('');
			};
		};
		for (var d = 0; d < arrayInputs.length; d++) {
			if ($(arrayInputs[d]).prop('checked') && (answers[d] === "true")) {
			correctAnswers.push(arrayInputs[d])
			};
		};
		generateResults();
	})

// NOTE: FINISH ANALISE QUESTIONS AND ANSWERS

// NOTE: GENERATE TEMPLATE OF RESULTS

	function generateResults() {
		var contentResults = $("#results").html();
		dataResults.correctAnswers = correctAnswers.length
		dataResults.allAnswers = variab.length

		var getResults = tmpl(contentResults,dataResults);
		$(getResults)
			.appendTo('body')
			.on('click',function () {
				$(this)
					.remove();
			location.reload()
			});
	};
// NOTE: FINISH GENERATE TEMPLATE OF RESULTS
})
