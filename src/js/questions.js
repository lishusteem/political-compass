(function() {
  var dot = document.getElementById('dot');
  var number = document.getElementById('number');
  var title = document.getElementById('title');
  var answers = document.getElementById('answers');
  var answerEls = document.querySelectorAll('.answer');
  var questions = [
    {
      flip: false,
      title: "It's crucial to verify the identity of users in crypto transactions to prevent money laundering and criminal activities.",
      type: 'economic',
    },
    {
      flip: false,
      title: 'Technological advancement in cryptocurrencies should be prioritized over environmental concerns.',
      type: 'social'
    },
    {
      flip: true,
      title: 'Privacy and anonymity should be prioritized over identity verification in crypto transactions.',
      type: 'economic'
    },
    {
      flip: true,
      title: 'The environmental impact of cryptocurrencies is a major concern that should be addressed.',
      type: 'social'
    },
    {
      flip: true,
      title: 'Decentralization should be prioritized over scalability in blockchain technology.',
      type: 'economic'
    },
    {
      flip: true,
      title: 'Cryptocurrencies have the potential to significantly improve global financial inclusion.',
      type: 'social'
    },
    {
      flip: false,
      title: 'I prefer high-performance, scalable blockchain solutions even if they sacrifice some decentralization.',
      type: 'economic'
    },
    {
      flip: false,
      title: 'Profit generation and wealth accumulation should be the main focus of cryptocurrencies',
      type: 'social'
    },
    {
      flip: true,
      title: 'Cryptocurrency platforms should be open and accessible to everyone without requiring specific criteria or approval.',
      type: 'economic'
    },

    {
      flip: false,
      title: 'Cryptocurrency projects should prioritize their commercial success and profitability. ',
      type: 'social'
    },
    {
      flip: false,
      title: 'Strong security measures should be prioritized, even if they result in a more complex user experience.',
      type: 'economic'
    },

    {
      flip: true,
      title: 'I would invest in a cryptocurrency project that focuses on environmental sustainability over potential profits.',
      type: 'social'
    },
    {
      flip: true,
      title: 'Trustless, decentralized systems are more important than those that require trust in third parties or centralized entities.',
      type: 'economic'
    },

    {
      flip: false,
      title: 'The primary purpose of cryptocurrencies is to enable individuals to protect and grow their wealth.',
      type: 'social'
    },
    {
      flip: false,
      title: 'Government regulation of cryptocurrencies is necessary to protect users and maintain stability',
      type: 'economic'
    },

    {
      flip: true,
      title: 'Cryptocurrency projects should prioritize transparency and ethical practices',
      type: 'social'
    },
    {
      flip: true,
      title: 'Decentralized exchanges are more resilient and align better with the principles of cryptocurrencies.',
      type: 'economic'
    },
    
    {
      flip: false,
      title: 'The long-term success of cryptocurrencies depends on their ability to generate profits for investors.',
      type: 'social'
    },
    {
      flip: false,
      title: 'Centralized cryptocurrencies are more likely to gain widespread adoption because of their efficiency and user-friendly features.',
      type: 'economic'
    },


    {
      flip: true,
      title: 'It is important for cryptocurrencies to minimize their carbon footprint, even if it affects their performance.',
      type: 'social'
    },
    {
      flip: false,
      title: 'Centralized organizations are better equipped to handle complex decisions and operations than decentralized autonomous organizations (DAOs)',
      type: 'economic'
    },


    {
      flip: false,
      title: 'The performance and growth of cryptocurrencies are more important than minimizing their carbon footprint.',
      type: 'social'
    },
    {
      flip: true,
      title: 'Decisions about the development of blockchain technology should be made by the community through decentralized governance.',
      type: 'economic'
    },

    {
      flip: true,
      title: 'I believe that cryptocurrency adoption can lead to a more equitable distribution of wealth.',
      type: 'social'
    },
    {
      flip: false,
      title: 'The development of blockchain technology should be guided by a centralized authority.',
      type: 'economic'
    },

    {
      flip: false,
      title: 'I believe that cryptocurrency adoption will primarily benefit those who invest early and take risks.',
      type: 'social'
    },
    {
      flip: true,
      title: 'Cryptocurrency protocols should be designed to prevent the concentration of power and influence',
      type: 'economic'
    },

    {
      flip: false,
      title: 'I believe that cryptocurrency adoption will primarily benefit those who invest early and take risks.',
      type: 'social'
    },

    {
      flip: false,
      title: 'I believe that some centralization is necessary for the efficient management of cryptocurrencies.',
      type: 'economic'
    },

    {
      flip: true,
      title: 'I am more likely to use a cryptocurrency that is dedicated to creating a positive social impact.',
      type: 'social'
    },

    {
      flip: true,
      title: 'Cryptocurrencies should have built-in governance mechanisms to enable changes through consensus rather than relying on centralized authorities.',
      type: 'economic'
    },
    {
      flip: true,
      title: 'The success of a cryptocurrency should be measured by its positive impact on society, not just its market value.',
      type: 'social'
    },
    {
      flip: false,
      title: 'I am more likely to use a cryptocurrency that has a strong potential for financial growth. ',
      type: 'social'
    }
    
  ];
  var questionNum = 1;

  function setup() {
    window.addEventListener('hashchange', onHash);
    answerEls.forEach(function(answerEl) {
      answerEl.addEventListener('click', onClick);
    });
    onHash();
  }

  function load(num) {
    console.log('questions.load', num);
    var question = questions[num - 1];
    number.innerText = `Question ${num}`;
    title.innerText = question.title;
    questionNum = num;
  }

  function onClick(e) {
    var num = Number(e.target.getAttribute('data-num'));
    console.log('questions.answer', questionNum, '=', num);
    questions[questionNum - 1].answer = num;
    e.target.blur();
    updateChart();
    if (questionNum < questions.length) {
      answers.style.display = 'flex';
      window.location.hash = questionNum + 1;
    } else {
      answers.style.display = 'none';
      number.innerText = `Complete!`;
      title.innerText = 'All questions answered';
    }
  }

  function onHash() {
    var num = Number(window.location.hash.slice(1));
    if (num) {
      load(num);
    } else {
      reset();
      updateChart();
      load(1);
    }
  }

  function reset() {
    answers.style.display = 'flex';
    questions.forEach(function(question) {
      delete question.answer;
    });
    console.log(questions);
  }

  function updateChart() {
    var results = {
      economic: {
        matches: 0,
        score: 0
      },
      social: {
        matches: 0,
        score: 0
      }
    };
    questions.forEach(function(question) {
      if (question.answer) {
        if (question.flip) {
          results[question.type].score = results[question.type].score - question.answer;
        } else {
          results[question.type].score = results[question.type].score + question.answer;
        }
        results[question.type].matches += 1;
      }
    });
    var economic = results['economic'].score / (results['economic'].matches || 1);
    var social = results['social'].score / (results['social'].matches || 1);
    console.log('questions', questions);
    console.log('results', results);
    console.log('economic', economic);
    console.log('social', social);
    dot.style.left = ((economic + 1) / 2) * 100 + '%';
    dot.style.top = ((social + 1) / 2) * 100 + '%';
  }

  setup();
}());
