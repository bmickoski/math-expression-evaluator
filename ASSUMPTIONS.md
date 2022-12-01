## Process of implementation was break down in 3 steps:

1. First step was converting user input in arrays of char (either it is digit or operand or function name like sin for example).

2. Second step is converting this chars from infix notatin to Reverse Polish notation
   [ReversePolishNotation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)

   For this I used process known as Shunting yard algorithm [ShuntingYardAlgorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm)

3. Third and final step is to do evaluation for Reverse Polish notation array and return result
   To evaluate postfix Reverse Polish notation we read from left to right and do operation when the first two operands of each operator are available

## Validation of expressions:

About validation I created separate function that does this validation. Later this is used to validate user input on each key press. If we find some
character different from digit, operator or function name we return false orherwise true.

**NOTE**
I was little busy and am aware that validation is not fully implemented there are some bugs there especially for recursive expressions.

## Evaluation

For evaluation part we are executing alll 3 steps mentioned before using 3 helper functions in evaluator service. I have own implementation for +, −, ∗, /
while for sin, cos and tan using Math functions but at least logic for validating this 3 functions is implemented.

**NOTE**

I am aware that validateExpression and extractNumbersAndOperands are similar but did not have time to make this refactor to requese extractNumbersAndOperands instead of validateExpression

## Calculator

For SPA implement really simple Angular app in which use can enter some input which is validated on each key press. After clicking on Evaluate button
if expression is valid user will see success result otherwise error message. Also, last 5 valid expressions are shown for user (on each 6th we are removing oldest one) using simple localStorage logic (we could have go with some state manipulation like using Akita or NgRX but there is really no neeed for that here )

## Calculator UI

For this task previous angular app was updated to have two header items from which user can choose to open simple Calculator or SuprCalculator page.
Simple UI calculator is implemented which uses existing evaluator service for validating and evaluating user expressions. Also random generator button is implemented which was part of requirement
