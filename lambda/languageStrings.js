/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            SKILL_NAME: 'Cricket Trivia developed by Tech Monk Kapil',
            GET_FACT_MESSAGE: 'Here\'s your interesting cricket trivia curated by Tech Monk Kapil..',
            HELP_MESSAGE: 'You can say tell me a Cricket Trivia, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            FALLBACK_MESSAGE: 'The Cricket Trivia Facts skill can\'t help you with that. It can help you discover facts about Cricket if you say tell me a Cricket Trivia. What can I help you with?',
            FALLBACK_REPROMPT: 'What can I help you with?',
            ERROR_MESSAGE: 'Sorry, an error occurred. Please start again later',
            STOP_MESSAGE: 'Ta-Ta!',
            FACTS:
                [
                    'Sunil Gavaskar was out of the first ball of a Test match thrice in his career.',
                    'Iftikhar Ali Khan Pataudi is the only cricketer to have played Test cricket for both India and Pakistan.',
                    'Chris Gayle is the only batsman to hit a six off the first ball of a Test match.',
                    'Shahid Afridi used Sachin Tendulkar\'s bat to hit 37 ball century in an ODI.',
                    'Sanath Jayasuriya has taken more ODI wickets than Shane Warne.',
                    'The only bowler to dismiss Don Bradman hit wicket in Test cricket is Lala Amarnath.',
                    'Allan Border played 153 consecutive Test matches.',
                    'On the morning of 11/11/11 South Africa needed 111 runs to win at 11:11.',
                    'Peter Siddle of Australia is the only bowler in international cricket to take a hat-trick on his birthday.',
                    'Mahela Jayawardene is the only player to score century in Semi-Final and Final of a World Cup.',
                    'Saurav Ganguly holds the record for grabbing four consecutive man of the match awards in ODIs.',
                    'Rahul Dravid has a wall named after him at Chinnaswamy Stadium to honor his 10,000 test runs.',
                    'Jonty Rhodes is the only player to receive man of the match award playing as a substitute.',
                    'The 2000 Lords Test between England and West Indies saw all four innings being played on the same day.',
                    'Dinesh Karthik is the first Indian to win a Man of the Match award in a T20I match.',
                    'Kapil Dev was the first Indian to score a century for India in an ODI.',
                    'Anil Kumble and Jim Laker are the only bowlers to take 10 wickets in a single Test inning.',
                    'Shoaib Akhtar bowled the fastest delivery in cricket history at 161.3 kilometers per hour.',
                    'Cricket began as a children\'s game in England in the 16th century.',
                    'The longest recorded cricket match was the 1939 England vs South Africa Test, lasting nearly 90 days.',
                    'Cricket is the second most popular sport in the world.',
                    'Cricket wickets originally only had two stumps.',
                    'Sachin Tendulkar debuted at only 16 years old.',
                    'Bapu Nadkarni holds the record for 21 consecutive maiden overs in Test cricket in 1964.',
                    'The length of the pitch is the only unchanged cricketing law since the sport\'s inception.',
                    'Jim Laker dismissed 19 Australian cricketers in a single Test match.',
                    'Virat Kohli is the fastest batsman to reach 3000 ODI runs.',
                    'MS Dhoni is the only captain to win the T20 World Cup, ODI World Cup, and Champions Trophy.',
                    'Kane Williamson became the fastest batsman to score 7000 Test runs.',
                    'Steve Smith has the highest Test batting average in the modern era.',
                    'Pat Cummins bowled the fastest ball in Test cricket at 169.6 kilometers per hour.',
                    'Jasprit Bumrah is the first Indian bowler to take a hat-trick in Test cricket.',
                    'Rohit Sharma is the leading run-scorer in T20 Internationals.',
                    'Babar Azam became the youngest Pakistan captain at 23 years old.',
                    'Ben Stokes won the Man of the Match in the 2019 ODI World Cup final with an incredible one-handed catch.',
                    'Lasith Malinga holds the record for most ODI wickets with 346 dismissals.',
                    'Shaheen Shah Afridi is the fastest to 50 ODI wickets.',
                    'Mithali Raj is the leading run-scorer in women\'s international cricket.',
                    'Alyssa Healy holds the record for the highest individual ODI score by a woman at 129 runs.',
                    'The IPL has become one of the most watched cricket leagues in the world.',
                    'Mitchell Marsh holds the record for the fastest Test century, scoring 100 runs in 19 balls.',
                    'Kumar Sangakkara was the first male cricketer to score back-to-back centuries in the World Cup.',
                    'Wasim Akram remains the greatest left-arm fast bowler in cricket history.',
                    'Brian Lara holds the record for the highest individual Test innings with 400 not out.',
                    'In women\'s cricket, Ellyse Perry is the only player to represent Australia in both cricket and football.',
                    'Ricky Ponting holds the record for most ODI runs with over 18,000 runs.',
                    'The cricket ball has seams made from cork with leather stitching.',
                    'A cricket pitch is exactly 22 yards long, which dates back to 1770.',
                    'T20 cricket was invented in England in 2003.',
                    'The World Test Championship is the first official global test cricket championship.',
                    'David Warner is known for his aggressive batting and has over 12,000 international runs.',
                    'AB de Villiers is known as the greatest all-around batsman of the modern era.',
                    'The highest test score in women\'s cricket is 242 runs by Kimberly Garth.',
                    'Afghanistan cricket team qualified for the ODI World Cup in 2015, just a decade after formal recognition.',
                    'The cricket World Cup is held every four years in different countries.'
                ],
        }
    }
}