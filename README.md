# 1. Architecture (Of whole Application)

![Alt text](./architecture.png?raw=true "Title")


# 2. Feature Specification: -

### 1. User Authentication

**How we planned:**

Starting with user registration where user will register with their details like first name, last name,
password, three security questions and answers. Upon filling these details when user hits register a
method first performs input validations incase input validations fails, we point out the error using alerts
to let user know about the error. If the input given by user passes all the input validations, then first a
call will be made to firebase authentications SDK to create account with the given username and
password, if an account already exists with the given email then error will show to user letting user
know to try with new email id. If account creation is successful a post request will be made to
setSecurityquestions API which will store all the security questions and their answers with email as thier
primary key.

For Login page we have implemented two options which are logging in with Google/ Facebook using
these option user wont have the burden of MFA as Google and Facebook already have their own MFAs.
So when user tries to login with Google/Facebook user will be redirected to a popup through which user
needs to authorize our app for logging in with their account then user will directly be logged in and will
be taken to Home page. When user who have registered through our platform tries to login user first
needs to enter correct username, password and then user will be redirected to Security questions page,
as we already have email of the user we make a call to getSecurityQuestions API which selects one out
of three security questions randomly and returns us the question we verify how if the answer given by
answer is right else user will be given a prompt that answer is wrong and if right user will be redirected
to home page.

**How we Did:**

Everything mentioned above has been achieved in the way mentioned above expect for facebook login
which was not possible for us to do due to some internal issue of the API except that everything else is
achieved.

**Testing:**

```
Index Test Case Result Test
Mode
Registration
```
1. Username already exists while
    registering

```
Promt will be shown that user name already exists Manual
```
2. Doesn’t pass input validations Validation error message will be displayed. Manual
3. Registration Process successful User will be redirected to login page Manual
    **Login**
4. Invalid username and
    password combination

```
User will be sent a prompt saying invalid
username and password combination
```
```
Manual
```

5. Correct username and
    password

```
User will be redirected to security question page Manual
```
6. Wrong security answer User will be given a promt Manual
7. Correct answer for security
    question

```
User will be redirectd to lobby Manual
```
8. Login with socials Pop up will show up; upon successful login user
    will be redirected to lobby

```
Manual
```
**Screenshot**

```
Figure 2 :invalid username and password combination promt
```

```
Figure 3 :Pop up of login with google
```
_Figure 4 :security question screen post entering correct credentials._


```
Figure 5 :input validation prompt in regestration page
```
**Cloud Services was planned:** Firestore authentication, DynamoDB, Lambda

**Cloud Services used:** Firestore authentication, DynamoDB, Lambda, API Gateway.

### 2. User Profile Management:

This feature is for enabling users to view, update and monitor personal account. This feature
has 4 sub parts. The feature encompasses four essential functionalities. Firstly, it enables users
to effortlessly modify their personal details, including name, phone number, address, and
profile picture. Secondly, users can access and review their game statistics, providing insights
into the number of games played and the total points earned. Additionally, users have the
capability to manage their team affiliations by creating new teams and sending invitations to
potential team members. The user's affiliations with various teams are prominently displayed
on their profile. Lastly, users can conveniently compare scores with other teams, fostering a
spirit of healthy competition and camaraderie. The frontend of the application is built using
React, facilitating smooth communication through HTTP calls to the AWS API Gateway [2]. This
interaction triggers AWS Lambda functions, developed in Node.js, which efficiently handle data
manipulation within DynamoDB [1][8]. For profile picture storage, the application utilizes an S
bucket, saving the image URL in the user table within DynamoDB.


**Planning Phase:**

The AWS cloud infrastructure was considered during the planning and design phase, using
Lambda and API Gateway to build a serverless backend. React was intended to be used in the
frontend development, promising a simple and user-friendly user interface. React components
can communicate with the API Gateway using a data transmission protocol, which then
launches related Lambda functions written in Node.js to manipulate data in DynamoDB [8].
Users can edit personal information, manage team affiliations, and view game statistics using
the User Profile Management feature, which was designed for this purpose. In order to
effectively managing user accounts and a separate Lambda function was planned to retrieve
scores for comparison.

**Implementation:**

To make user interactions with the User Profile Management feature easier, the frontend React
code was created during the implementation phase. Lambdas were also developed to handle a
variety of tasks, including fetching user trivia statistics, updating user information, saving profile
pictures in an S3 bucket, and retrieving team scores from DynamoDB [8]. The frontend and
backend systems can communicate without interruption because of the integration of these
Lambdas with API Gateway.

**Services Used:**

Frontend: React (JavaScript library for building user interfaces)

Backend: AWS Lambda (serverless computing service) with Node.js runtime

API Gateway: AWS API Gateway (to manage API endpoints and trigger Lambda functions)

Database: Amazon DynamoDB (NoSQL database service for data storage)

Storage: Amazon S3 (Simple Storage Service for profile picture storage)

**Test cases:**

```
Number Test Case Result
```
1. User navigates to profile
    page

```
All personal details will be retrieved and displayed.
Users’ trivia history will be displayed. Scores of all the
other teams are displayed.
```
2. User clicks on edit button Pop up window will open to update the details
3. User changes the existing
    data

```
Data is modified on UI
```

4. User clicks on submit
    button

```
Data is saved and redirected to profiles page with
updated details
```
5. Admin enters correct
    question details

```
Question will be created successfully in DynamoDB.
```
6. User clicks on submit
    button with empty field.

```
Error message is displayed for enter in the field.
```
**Screenshots:**

```
Figure 6 : User Profile page
```

```
Figure 7 :update user form
```
_Figure 8 :updated profile details_


```
Figure 9 :Trivia details
```
_Figure 10 :edit another detail_


```
Figure 11 :updated data
```
### 3. Team Management

The team management module consists of features related to creating and managing a team
within the game platform. A player can create a team by naming it whatever they want. Once
created they are automatically the admin of the group. They have the option of inviting other
players to join the team. The invitee will get the invitation in the form of an email. The email will
contain a link which when pasted into the browser will take them to a page where they can either
accept or decline the invitation. If the invite is declined, the inviter receives an invite saying that
the invitee has declined the message. However, if the invitee decides to accept the invitation,
then they are added to the team as a player, the inviter gets an email that they have accepted
the invitation, and finally all the team members get an email saying that the team has been
updated. They can visit the team dashboard to see the changes. Once in the dashboard, the
admin can change the roles of other players and save it. Once saved, all the team members get
another email saying that the team has been updated. If a player wishes to leave the team, they
have the option to by clicking the respective button.

**Planning Phase**

At first, I planned to use SNS [9] to directly send the email to the user. However, this presented
a few problems. The first major one was that the user would have to subscribe to the SNS by
clicking the link in the email and only then will they receive any other emails from the SNS. I felt
that this was not a good user experience as the email does not indicate anywhere that this was
an email from the TriviaTitans application. Secondly, the amount of customization for the email


is also very limited. The sender will always be Amazon SNS and the body will also contain lot of
boilerplate warnings which made the email look very bad.

**Implementation**

Ultimately, I decided to use SES [10] to send the email. The final flow of sending the email is given
below:

API Gateway -> Lambda -> SNS -> SQS -> Lambda -> SES

The parts of the feature that were not implemented were creating the team’s name using
ChatGPT API and displaying team statistics.

**Services Used:** API Gateway, Lambda, DynamoDB, SQS, SNS, and SES

**Screenshots:**

**Test 1**

```
Number
Test Case
Result
```
1. User Creates Team
    Team with team name gets created
2. User sends invite to another
    user by entering email ID

```
Invitation email gets sent to invitee
```
3. Invitee declines invite Inviter gets email saying invitee declined
    invitation
4. Invitee accepts invite Inviter gets email saying invitee accepted
    invitation. All team members get email about
       update to the team

```
5.
```
```
Admin changes roles of
teammates
```
```
Every teammate gets an email about update
to the team
```
6. User leaves team Every teammate gets an email about update
    to the team


```
Figure 12 :User creates a team
```
**Test 2**


```
Figure 13 :User invites a member
```
```
Figure 14 :Team Invitaiton Email
```
**Test 3**


```
Figure 15 :Invitee declines invitation
```
```
Figure 16 :Invite Rejection Email
```
**Test 4**


```
Figure 17 :User accepts invites
```
```
Figure 18 : Invite Acceptance Email
```
**Test 5**


_Figure 19 :Before user makes changes to roles in team_


```
Figure 20 :After user makes changes to roles in team
```
```
Figure 21 :Team updated Email
```
**Test 6**

```
Figure 22 : User leaves team
```

_Figure 23 :After user leaves team_

```
Figure 24 :Team Update Email
```

### 4. Trivia Game Lobby

The game lobby should be displaying all the games created by the admin to the lobby page and
should allow the users to join the game. Along with this, it should filter the games based on
category and difficulty levels. Also, once the user logs into the game and opens the page, he
should see the game names in the screen with description and the timings of the game.

**Planning Phase:**

During the planning phase of the trivia game lobby project, I planned to first create the React Js
frontend design for the lobby page. After that I planned to create the API gateway and decided
to use the mock data for testing purposes. Later, I planned to write a logic for filtering the
games based on the category and names.

Evaluation Phase:

In the implementation phase, I set up the React.js frontend, creating components for the lobby,
and game details page as planned. Then I established connections to the API Gateway and
implement Lambda functions to fetch game data from the backend of the admin. After, I wrote
the logic of filtering the games based on categories and name search, allowing users to browse
games by category or search by name. Later I developed the game details page, presenting a
short description and extra details of the games opened by user, along with a "Join Game"
button that redirects to the game page where API gateway triggers the Lambda function to
fetch the questions.

**Services Used:**

React: To develop the frontend logic of the page

AWS Lambda: code to access data from the API gateway which fetches the data from
DynamoDB

Test Cases:

```
Number Test Case Result
```
1. User navigates to the Lobby page
    All games created by admin can be visible
2. User clicks on filter games by
    “Easy” difficulty

```
All games having Easy category are displayed
```
3. User clicks on Search menu to
    search game by category

```
The games which are related to keyword user
has searched gets displayed
```

4. User clicks on Game Details button User gets redirected to a new page where they
    can see game details and join the game

**Screenshots:**

```
Figure 25 :Game Lobby page
```
**Test 2:**


```
Figure 26 :Testing the filter categories feature
```
Test 3:

```
Figure 27 :Game Details page
```
Test 4:

```
Figure 28 :Testing the search filter
```

### 5. In Game Experience

**How we planned:** The game flow we fixed on is, there is nothing specific to user in the context of game. All
interactions with the user will be as part of a team user can be the only one in team and can interact with
game but user alone can't participate in game. First user forms a team and to participate in a game user has to
select a team from which user wants to participate. At the time of game creation admin specifies game start
time, game can be accessed only after given time for window required. Though the game will be visible in the
lobby, the user will be restricted from entering the game before or after the time window specified by user. As
user selects a team to play there might be other players of the team playing as well only the first answer
submission will be considered after answer is submitted answer will be locked for the second submission. The
score of the team is the individual score of every user in the game as well as the user profile is built by user
specific combination of teams and games and team profile is built based on the team’s performance in games.

For implementing game chat, we thought of using WebSocket where we connect to WebSocket and join the
room with a room id which is gameid + teamid make the chat room specific for only one team for that game.
When users are connected to WebSocket created in API gateway user joins through a room id and these
connections are stored in DynamoDB under the room id which is primary key. So, whenever anyone sends a
messages connections are extracted for the room id and message is sent to all the connections that are stored
under the room id. Upon disconnecting the connection string will be deleted from their appropriate room id.
This is the idea of building game chat.

For implementing gaming we thought of achieving it by creating event bridge trigger based on the game start
time and the will be started and all the users who logged into the game will be connected to the particular
gameid in WebSocket so when the lambda is trigger with event bridge on a given time it will push questions to
users listening on the websocket on that particular game id. Once user submits the answer there will be a
action present for that submitting answers in the websocket which will save the answer in DynamoDB. After
every question leaderboard will be published to users by websocket and post game submission report and
leaderboard with scores will be given to user. This is the initial idea of building the game.

**How we Did:** For game chat everything mentioned above has been achieved in the way mentioned above. But
for implementing the game with the WebSocket approach mentioned above in the process we found we need
to trigger lambda timely to publish or initiate game with event bridge but due to cold start or for some other
reason the action is taking place after 4 - 5 seconds and question is displayed for only 20 seconds and the game
statistics is displayed only for 10 seconds 4-5 seconds of delay seemed huge and was not giving proper user
experience consistently. Though there might be ways of achieving consistency in this regard we couldn’t find
one. Moreover, the websocket got populated with many actions like gamestatistics, save, submit, question,
and few others. So, we came up with another approach which is, user will be able to start the game only after
the game start time once the user goes to login page a post call will be made, by which we receive all the
questions of that particular game; Along with the question game details will also be fetched, so the javascript
code checks for time now and the start time of the game and places user in the timeline where user should be
if the user have started on time(example: game starts at 17:45:00 and user joins game at 17:45:35 so the time
for one question is 20 seconds and for break is 10 seconds so user missed question one and break one as he is
35 seconds lates user will be place in question 2 with 15 left). This logic of syncing all the players is handled by
JavaScript code in the front-end. Once user hits on save for an answer a call will be made to a Lambda with
details of gameid, teamid, question, answer; the answer will be saved and further save requests by other team


members wont be considered and the lambda checks if the answer is right and adds to the team’s game’s
score table if its right. Once the answer is saved answering options will be blocked for user to submit the
answer again. Upon reaching to the last question user will be able to see submit button upon clicking user will
be redirected to post game page where details of game’s dashboard and team’s submission will be fetched
and user will be shown report of the game like what are right, wrong, explanation, and score. The game works
in question-break cycle where question will be displayed for 20 seconds and in 10 seconds break user will be
shown dashboard until that question and review of last question.

**Testing:**

```
Index Test Case Result Test
Mode
```
1. Chat messages sent Messages should only be received to team members Manual
2. user joined chat User’s connection string should be added to the
    database

```
Manual
```
3. User left chat User’s connection string should be deleted from the
    database

```
Manual
```
4. User tries to join before
    start time

```
User should not be given access to and should be
restricted
```
```
Manual
```
5. User tries to join game after
    it starts

```
User will be redirected to game page Manual
```
6. User tries to join without
    selecting team

```
User will be given a prompt Manual
```
7. User tries to join by
    selecting team

```
User will be redirected to game page Manual
```
8. User joins on time User will be shown question form first Manual
9. User joins late User will be taken to question based on the time now
    to sync with rest of the players

```
Manual
```
10. User joins after game
    submission

```
Prompt the user saying game completed and redirect
to lobby
```
```
Manual
```

_Figure 29 :user tries to access game before game start time; access restricted._

```
Figure 30 :user tries to access game after the game start time
```

```
Figure 31 :question view
```
_Figure 32 :break view with current dashboard and review on previous question_


```
Figure 33 :Post game page with leaderboard and team score and question-wise review
```
**Cloud Services was planned:** DynamoDB, API-Gateway (rest, WebSocket), Lambda, Event Bridge.

**Cloud Services used:** DynamoDB, API-Gateway (Rest, WebSocket), Lambda.

## 6. Leaderboards:

The Leaderboard feature was created to highlight the trivia game's top performers. Users'
game-playing data was saved in DynamoDB, enabling the leaderboard to be updated in real-
time. Users were given a thorough list of the top performers, organized by overall, monthly,
weekly, and daily rankings, when they accessed the leaderboard. The leaderboard was
presented visually, with dynamic graphs showing the performance data of the leaders in real-
time, to improve user experience. Users could easily switch between the various icons for daily,
weekly, monthly, and all-time rankings, giving them insightful information about their progress
and encouraging players to be competitive.

**Planning Phase:**

During the planning phase of the Leaderboard feature, the focus was on designing an efficient
data management system to provide real-time game performance insights. Since the game data
was going in DynamoDB, to use the looker studio, we needed the data in fire store. The
decision was made to store game data in DynamoDB, accessible through a Lambda function and


an API Gateway URL [5]. To integrate with Looker Studio, a GCP cloud function would transfer
data to Firestore, while BigQuery would create daily, weekly, and monthly leaderboards with
custom queries for effective data filtering [3][4]. The results would be exported to Looker
Studio for interactive tables and graphs.

**Implementation Phase:**

During the implementation phase of the Leaderboard feature, game data was efficiently stored
in DynamoDB, and a Lambda function was developed to fetch and expose the data through an
API Gateway URL. The integration with Looker Studio was achieved using a GCP cloud function,
enabling smooth data transfer to Firestore [3][4]. Custom queries in BigQuery were utilized to
create separate tables for daily, weekly, and monthly leaderboards, facilitating effective data
filtering [6]. The BigQuery results were then exported to Looker Studio, where interactive tables
and graphs were generated, offering users a dynamic and engaging view of their gaming
achievements [6].

**Services used:**

Looker Studio: Utilized for data visualization and dynamic graph generation.

GCP Cloud Function: Executing serverless functions for accessing gameplay data from
DynamoDB.

Google Cloud Firestore: Storing and managing user gameplay data for real-time updates and
leaderboard rankings.

Google BigQuery: Used for querying and analyzing gameplay data to generate leaderboard
rankings.

AWS Lambda: code for data access from DynamoDB to send to GCP Cloud Function.

AWS API Gateway: Creating API endpoints for leaderboard data retrieval.

React: Developing the frontend interface.

Nodejs: Used for writing lambda and cloud function.

Amazon DynamoDB: Storing user gameplay data and maintaining the overall leaderboard.

**Test cases:**

```
Number Test Case Result
```
1. User navigates to Leaderboard
    page

```
Global all time leaders are displayed in table
and visual statistics are displayed
```

2. User clicks daily leaders’ icon daily leaders are displayed in table and visual
    statistics are displayed
3. User clicks weekly leaders’ icon Weekly leaders are displayed in table and visual
    statistics are displayed
4. User clicks monthly leaders’ icon Monthly leaders are displayed in table and
    visual statistics are displayed

**Screenshots:**

## Figure 34 : All time leaderboard


## Figure 35 : Daily leaderboard

## Figure 36 : weekly leadersboard


## Figure 37 : Monthly leaderboard

### 7. Trivia Content Management (Administrators):

The Trivia Content Management (Administrators) module is specifically for admin users of the
system. Using this module, the admin user can manage games, categories, and questions for the
game. There are different forms that I have created to perform different operations to manage
games, categories, and questions of the game. Once any operation is executed, for example, if
the admin user has created a game, it will call the API gateway endpoint, which is bound to the
lambda function, and this lambda function will be used to perform CRUD operations in
DynamoDB. The code for lambda functions is written in Node.js, and the FET part is written in
React.js. Also, to monitor and analyze gameplay data and user engagement, I have used Looker
Studio. I had all my data related to this in DynamoDB. So, I have created a cloud function that will
call the lambda function, get all the required data from DynamoDB, and store it in the Firestore.
I have also used GCP Big Query to get the desired result from data stored in Firestore and used
this result to generate graphs and tables using Looker Studio.

**Services Used:** API gateway, Lambda Function, DynamoDB, Cloud Function, Firestore, Looker
Studio, Big Query

```
Number Test Case Result
```

1. Admin enters correct game
    details.

```
Game will be created successfully in
DynamoDB.
```
2. Admin enters Incorrect game
    details

```
Validation message will be
displayed.
```
3. Admin enters correct category
    details

```
Category will be created
successfully in DynamoDB.
```
4. Admin enters Incorrect
    category details

```
Validation message will be
displayed.
```
5. Admin enters correct question
    details

```
Question will be created
successfully in DynamoDB.
```
6. Admin enters Incorrect
    question details

```
Validation message will be
displayed.
```
7. Admin go to Game Dashboard Graph related to game and user
    data will be displayed.

**Screenshot: -**

Test Case 1:

```
Figure 38 : Game will be created
```

Test Case 3: -

```
Figure 39 :tegories will be created
```

### 8. Notifications and Alerts:

The Notifications and Alerts module is designed to give notifications about events that happen in
the app to the users in a team or to all registered users within the application. The notifications
are sent as an email to the users. Whenever a team member gets added to a team, leaves a team
or roles get changed within the team, all team members get alerted about an update. If a team
member wants to invite their team to a game, they can press the invite button which will send
the email notification to all the teammates. Whenever a new trivia game is created, all the
registered users get the email notification about it.

**Planning Phase**

At first, I thought of implementing notifications as a UI component within the application itself.
However, to implement that and to get the notifications in real time, I would have needed to
use web sockets or something like firebase messaging.

**Implementation**

I decided to use SNS, SQS [11] combined with SES, same as the team management feature. It
allowed both features to deliver notifications the same way and made development a lot more
streamlined. The flow for sending the email notifications is the same as what was shows in the
team management module.

API Gateway -> Lambda -> SNS -> SQS -> Lambda -> SES

The parts of the feature that are not implemented are alerts for new achievements and
leaderboard changes.

**Services Used:** API Gateway, Lambda, DynamoDB, SQS, SNS, and SES

```
Number Test Case Result
1.
New teammate gets added to
the team
```
```
All teammates get email about the
update
```
2. Team members get their
    roles changed

```
All teammates get email about the
update
```
3. New trivia game gets created All users get the email notification
4. User invites team to game All teammates get email about the
    game

**Screenshots:**

**Test 1**


```
Figure 40 :User accepts team invitation
```
```
Figure 41 :Team Update Email
```
**Test 2**


```
Figure 42 :Changes made to the team
```
```
Figure 43 :Team Update Email
```
**Test 3**


```
Figure 44 :Creating new game
```
```
Figure 45 :New Game Email
```
**Test 4**


```
Figure 46 :Game Invitation sent
```
```
Figure 47 :Game Invitation Email
```
### 9. Automated Question Tagging:

The Automated Question Tagging module is used to automatically tag each trivia question with
relevant categories based on its content, such as sports, computers, science, general knowledge,
or entertainment. For this, I have used the Natural Language API of GCP, Cloud Function, and


DynamoDB. When the admin user creates any question for a game, before storing that question's
details in DynamoDB, I'm calling my cloud function, which will take the question as input and give
an automatically generated tag based on the content using the GCP Natural Language API. Now
I will add this tag to the question object and then store this whole object, which contains all the
question details, with an autogenerated tag for that question in DynamoDB.

**Services Used:** GCP Natural Language API, Cloud Function, DynamoDB

```
Number Test Case Result
```
1. Question is long enough to
    generate automated tags.

```
Automated Tags will be generated
```
2. Question is too small to
    generate automated tags.

```
Internal Server Error will be
returned.
In this case I’m storing empty in
Tags column for that question.
```
**Screenshot: -**

Test Case 1

```
Figure 48 : Question too long to generate automated tags
```

Test Case 2

```
Figure 49 : Question too small to generate automated tags
```

# 3. Application Roadmap

### 1. User Authentication

```
Figure 50 : user flow of registration
```

_Figure 51 : user flow of Login_


### 2. User Profile management

```
Figure 52 :User Profile management roadmap/workflow
```

### 3. Team Management

```
Figure 53 :Team management workflow from user perspective
```
```
Figure 54 :Team Invite Email flow for invitee
```

### 4. Game Lobby

```
Figure 55 :Lobby Game flow
```

### 5. In Game Experience

```
Figure 56 :user flow of in game experience- module 5
```

### 6. Leaders Board

```
Figure 57 :Leaderboard roadmap/workflow
```
### 7. Admin


```
Figure 58 : Flow for team management
```
As you can see in the above flow diagram, I've combined the features of automated question
tagging and trivia content management (administrators). First, when admin users login to the
system, they will be redirected to the admin dashboard, where they can see all games, categories,
and questions in tabular format. Depending on what is needed, they can now choose from
alternatives like doing CRUD operations on categories, creating games, or performing CRUD
operations on questions. Additionally, when an admin creates a question, I automatically create
tags for that question using the Natural Language API and store all of its details in the database
along with those tags.


### 8. Notifications and Alerts

```
Figure 59 :Workflow of sending notification for new game
```
```
Figure 60 :Workflow of sending game invitation notification
```

```
Figure 61 :Workflow of team update notifications
```
### 9. Automatic Question Tagging


