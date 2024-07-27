from flask import Flask, jsonify, request
from flask_cors import CORS
import mathgenerator
import random

app = Flask(__name__)
CORS(app)


@app.route('/question/', methods=['GET'])
def getQuestion():
    problem = ""
    solution = ""
    questionType = ""

    category = request.args.get("category")
    if (request.method == "GET"):
        # return questions for basic math category
        if (category == "basic_math"):
            list = [0, 1, 2, 3, 4]
            index = random.choice(list)
            if (index == 0):
                problem, solution = mathgenerator.addition()

                # return string cleanup
                problem = problem.replace("$", "")
                solution = solution.replace("$", "")

                questionType = "Addition"
            if (index == 1):
                problem, solution = mathgenerator.subtraction()

                # return string cleanup
                problem = problem.replace("$", "")
                solution = solution.replace("$", "")

                questionType = "Subtraction"
            if (index == 2):
                problem, solution = mathgenerator.multiplication(12)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("\cdot", "*")
                solution = solution.replace("$", "")

                questionType = "Multiplication"
            if (index == 3):
                problem, solution = mathgenerator.division(144, 12)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("\div", "/")
                solution = solution.replace("$", "")

                questionType = "Division"
            if (index == 4):
                problem, solution = mathgenerator.square_root(1, 12)

                # return string cleanup
                problem = problem.replace("$", "")
                problem = problem.replace("\sqrt{", "√")
                problem = problem.replace("}", "")
                solution = solution.replace("$", "")

                questionType = "Square Root"

        # return questions for algebra

    return jsonify({
        "problem": problem,
        "solution": solution,
        "type": questionType
    })


if __name__ == "__main__":
    app.run(debug=True)
