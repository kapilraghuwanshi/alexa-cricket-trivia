/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            SKILL_NAME: 'Cricket Trivia developed by Kapil',
            GET_FACT_MESSAGE: 'Here\'s your interesting cricket trivia curated by Kapil Raghuwanshi: ',
            HELP_MESSAGE: 'You can say tell me a Cricket Trivia, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            FALLBACK_MESSAGE: 'The Cricket Trivia Facts skill can\'t help you with that.  It can help you discover facts about Crciket if you say tell me a Cricket Trivia. What can I help you with?',
            FALLBACK_REPROMPT: 'What can I help you with?',
            ERROR_MESSAGE: 'Sorry, an error occurred. Please start again later',
            STOP_MESSAGE: 'TaTa!',
            FACTS:
            [
                'Sunil Gavaskar was out of the first ball of a Test match thrice in his career.',
                'The only cricketer to play Test cricket for India and England is Saif Ali Khan’s grandfather, Iftikhar Ali Khan Pataudi.',
                'Chris Gayle is the only batsman to hit a six off the first ball of a Test match.',
                'Shahid Afridi used Sachin Tendulkar’s bat to hit 37 ball century in an ODI.',
                'Sanath Jayasuriya has taken more ODI wickets than Shane Warne.',
                'The only bowler to dismiss Don Bradman hit wicket in Test cricket is Lala Amarnath..',
                'Allan Border played 153 consecutive Test matches.',
                'On the morning of 11/11/11 South Africa needed 111 runs to win at 11:11.',
                'Peter Siddle of Australia is the only bowler in international cricket to take a hat-trick on his birthday.',
                'Sachin Tendulkar played for Pakistan before making his international debut for India.',
                'Mahela Jayawardene is the only player to score century in Semi-Final and Final of a World Cup.',
                'Saurav Ganguly holds the record for grabbing four consecutive man of the match awards in ODIs.',
                'Sir Don Bradman has just hit 6 sixes in his entire cricket career.',
                'DA wall has been built using in honor of Rahul Dravid at Chinnaswamy Stadium after after he completed 10,000 test runs.',
                'Jonty Rhodes is the only player to receive man of the match award playing as a substitute played.',
                'A cricket player with the longest surname is of Fiji’s IL Bula. His full name – Ilikena Lasarusa Talebulamaineiilikenamainavaleniveivakabulaimainakulalakebalau.',
                'The 2000 Lords Test between England and West Indies saw all the four innings being played on the same day.',
                'Dinesh Karthik is the first Indian to win a MoM award in a T20I match.',
                'Kapil Dev was the first Indian to score a century for India in ODI.',
                'We all know that Anil Kumble has taken 10 wickets in an inning in test cricket. But the only other bowler to take 10 wickets in a single inning was Jim Laker, who did it years before Kumble.',
                'Shoaib Akhtar bowled the fastest delivery in the history of cricket, 161.3 km/h hmmm!',
                'MS Dhoni has never scored an ODI century outside of Asia',
                'Cricket began as a childrens game in England in the 16th century',
                'The longest recorded cricket match was played between England and South Africa in Durban. It is also used for the timeless test. It lasted nearly 90 days and saw over 683 overs bowled.',
                'Can you believe that cricket is not an Olympic sport yet?',
                'Chris Gayle is the only batsman in Test history to hit a six off the first ball of a game.',
                'Iftikhar Ali Khan Pataudi is the only cricketer to have played Test cricket for both India and England.',
                'Cricket is the second most popular sport in the world',
                'Cricket wickets originally only had two stumps',
                'Sachin Tendulkar debuted at only 16 years old',
                'Bapu Nadkarni managed to nab himself an excellent little record on this front, scoring 21 consecutive maiden overs while playing for India in 1964.',
                'The length of the pitch is the only unchanged cricketing law',
                'In a single match, Laker dismissed a staggering 19 Australian cricketers, and to date, remains the only person ever to do so throughout the sport’s illustrious history.'
            ],
        }
    }
}