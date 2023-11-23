const Interview = require("../models/interview");
const Student = require("../models/student");

// renders the addInterview page
module.exports.addInterview = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_interview", {
      title: "Schedule An Interview",
    });
  }

  return res.redirect("/");
};

// Creation of new interview
module.exports.create = async (req, res) => {
  try {
    const { company, date } = req.body;

    await Interview.create({
      company,
      date,
    })
      .then(() => {
        req.flash("success", "Interview added!");
        return res.redirect("back");
      })
      .catch(() => {
        req.flash("error", "Couldn't add Interview!");
        return res.redirect("back");
      });
  } catch (err) {
    console.log(err);
  }
};

// Enrolling student in the interview
module.exports.enrollInInterview = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id);
    const { email, result } = req.body;

    if (interview) {
      let student = await Student.findOne({ email: email });
      if (student) {
        // check if already enrolled
        let alreadyEnrolled = await Interview.findOne({
          "students.student": student.id,
        });

        // preventing student from enrolling in same company more than once
        if (alreadyEnrolled) {
          if (alreadyEnrolled.company === interview.company) {
            req.flash(
              "error",
              `${student.name} already enrolled in ${interview.company} interview!`
            );
            return res.redirect("back");
          }
        }

        let studentObj = {
          student: student.id,
          result: result,
        };

        // updating students field of interview by putting reference of newly enrolled student
        await interview.updateOne({
          $push: { students: studentObj },
        });

        // updating interview of student
        let assignedInterview = {
          company: interview.company,
          date: interview.date,
          result: result,
        };
        await student.updateOne({
          $push: { interviews: assignedInterview },
        });

        req.flash(
          "success",
          `${student.name} enrolled in ${interview.company} interview!`
        );
        return res.redirect("back");
      }
      req.flash("error", "Student not found!");
      return res.redirect("back");
    }
    req.flash("error", "Interview not found!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Error in enrolling interview!");
  }
};

// deallocating students from an interview
module.exports.deallocate = async (req, res) => {
  try {
    const { studentId, interviewId } = req.params;

    // find the interview
    const interview = await Interview.findById(interviewId);

    if (interview) {
      // remove reference of student from interview schema
      await Interview.findOneAndUpdate(
        { _id: interviewId },
        { $pull: { students: { student: studentId } } }
      );

      // remove interview from student's schema using interview's company
      await Student.findOneAndUpdate(
        { _id: studentId },
        { $pull: { interviews: { company: interview.company } } }
      );

      req.flash(
        "success",
        `Successfully deallocated from ${interview.company} interview!`
      );
      return res.redirect("back");
    }

    req.flash("error", "Interview not found");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Couldn't deallocate from interview");
  }
};

module.exports.destroyInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);
    console.log("error in deleting");
    if (!interview) {
      req.flash("error", "Interview Not Found");
      console.log("error", "error in deleting");
      return;
    }
    interview.deleteOne();
    req.flash("success", "Interview deleted!");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", "Error in deleting Interview");
  }
};