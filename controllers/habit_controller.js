const Habit = require('../models/Habit');

module.exports.load = async function (request, response) {
    try {
        const habits = await Habit.find({});
        return response.render('home', { habit_list: habits });
    } catch (err) {
        console.log("Error in fetching habits from DB", err);
        // Handle the error as needed
    }
};
// This function helps in adding a habit in list.
module.exports.add = async function (request, response) {
    try {
        request.body.record_tracker = {};
        request.body.user = "AnyUser";
        console.log(request.body);
        const newhabit = await Habit.create(request.body);
        // Handle the new habit as needed, e.g., logging or other actions
        console.log("New habit created:", newhabit);
        return response.redirect("back");
    } catch (err) {
        console.log("Error in creating a habit:", err);
        // Handle the error as needed
    }
};


// This function helps in deleting a habit from list.
module.exports.delete = async function (request, response) {
    try {
        const id = request.query.id;
        await Habit.findByIdAndDelete(id);
        return response.redirect('back');
    } catch (err) {
        console.log("Error in deletion: ", err);
        // Handle the error as needed
    }
};


// Finds a habit by id given in query params and renders it
module.exports.viewhabit = async function (request, response) {
    try {
        const id = request.query.id;
        const habit = await Habit.findById(id);

        if (!habit) {
            console.log("Habit not found");
            return;
        }

        response.render("habit.ejs", { "habit": habit });
    } catch (err) {
        console.log("Error in finding habit: ", err);
        // Handle the error as needed
    }
};


// Finds a habit by id given in query params and returns it's json object
module.exports.fetchhabit = async function (request, response) {
    try {
        const id = request.query.id;
        const habit = await Habit.findById(id);

        if (!habit) {
            console.log("Habit not found");
            return response.json({ "status": "failed" });
        }

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(habit));
    } catch (err) {
        console.log("Error in finding habit: ", err);
        response.json({ "status": "failed" });
    }
};


// first find an element in database using id
module.exports.updateDates = async function (request, response) {
    try {
        const id = request.query.id;
        const date = request.query.date;
        const value = request.query.value;
        console.log(date, value, id);

        // Find the habit by ID
        const habit = await Habit.findById(id);

        if (!habit) {
            console.log("Habit not found");
            return response.json({ "status": "failed" });
        }

        const r_t = habit.record_tracker;

        // Check if the date already exists in the record_tracker
        if (date in r_t) {
            r_t[date] = value;
        } else {
            r_t[date] = value;
        }

        console.log(r_t);

        // Update the record_tracker using await with Habit.updateOne
        await Habit.updateOne({ "_id": id }, { $set: { record_tracker: r_t } });

        console.log("Habit updated");
        return response.json({ "status": "success" });
    } catch (err) {
        console.log("Error in updating habit: ", err);
        return response.json({ "status": "failed" });
    }
};
