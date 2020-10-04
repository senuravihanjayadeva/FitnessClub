import React, { useState, useEffect } from "react";
import axios from "axios";

import Background from "./img/gym.jpg";
import BackgroundMeal from "./img/meal.jpg";

import "./userforms.css";

export default function Userforms(props) {
  const [profileID, setProfileID] = useState();
  const [workout, setExercise] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [mealName, setMealName] = useState();
  const [mealTime, setMealTime] = useState();
  const [mealList, setMealList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState([]);

  useEffect(() => {
    //get data value from the Link
    const userprofileID = props.match.params.id;

    console.log("Profile ID is " + userprofileID);

    setProfileID(userprofileID);

    axios
      .get("http://localhost:5000/api/profile/user/" + userprofileID)
      .then((res) => {
        console.log("Profile Details " + res.data.workoutplan);
        console.log(
          "Profile workoutplan length " + res.data.workoutplan.length
        );
        if (res.data.workoutplan.length > 0) {
          setWorkoutPlan(res.data.workoutplan);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("http://localhost:5000/api/instructor/meal").then((res) => {
      console.log("meal list " + res);
      setMealList(res.data);
    });

    axios.get("http://localhost:5000/api/instructor/workout").then((res) => {
      console.log("exercises list " + res);
      setExerciseList(res.data);
    });
  }, []);

  function onSubmitExercise(e) {
    e.preventDefault();

    const exercise = workout + " - " + sets + " sets of " + reps + " reps";
    const newExercise = {
      profileID,
      exercise,
    };
    axios
      .post(
        "http://localhost:5000/api/instructors/addworkouttouser",
        newExercise
      )
      .then(() => {
        alert("Success");
        //refresh Data After Deletion
        axios
          .get("http://localhost:5000/api/profile/user/" + profileID)
          .then((res) => {
            console.log("Profile Details " + res.data.workoutplan);
            console.log(
              "Profile workoutplan length " + res.data.workoutplan.length
            );
            if (res.data.workoutplan.length > 0) {
              setWorkoutPlan(res.data.workoutplan);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  }

  function onSubmitMeal(e) {
    e.preventDefault();

    const meal = mealName + " for " + mealTime;

    const newMeal = {
      profileID,
      meal,
    };
    axios
      .post("http://localhost:5000/api/instructors/addmealtouser", newMeal)
      .then(() => {
        alert("Success");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <div>
        <div className="row text-center">
          <h3 style={{ color: "#073370", padding: "20px" }}>
            Add Meal & Workout Plan{" "}
          </h3>
        </div>

        <div class="row" style={{ margin: "10px" }}>
          <div class="col-md-6">
            <div class="card" style={{ borderRadius: "15px" }}>
              <div
                class="card-body"
                style={{
                  borderRadius: "15px",
                  boxShadow: "4px 5px 7px rgba(68,69,69,0.44)",
                  backgroundImage: `url(${Background})`,
                  backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                  backgroundSize: "cover",
                  backgroundOpacity: 0.5,
                }}
              >
                <form onSubmit={onSubmitExercise}>
                  {/* Workout 1  */}
                  <div class="form-row" style={{ margin: "10px 0px" }}>
                    <div class="col">
                      <select
                        class="form-control"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "rgba(243,243,243,0)",
                          color: "rgb(255,255,255)",
                          borderWidth: "1.5px",
                          borderColor: "rgb(252,252,252)",
                        }}
                        onChange={(e) => {
                          setExercise(e.target.value);
                        }}
                      >
                        {exerciseList.map((currentExercise) => {
                          return (
                            <option
                              value={currentExercise.WorkoutName}
                              selected=""
                            >
                              {currentExercise.WorkoutName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="col">
                      <select
                        class="form-control"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "rgba(243,243,243,0)",
                          color: "rgb(255,255,255)",
                          borderWidth: "1.5px",
                          borderColor: "rgb(252,252,252)",
                        }}
                        onChange={(e) => {
                          setSets(e.target.value);
                        }}
                      >
                        <option value="sets" selected="">
                          sets
                        </option>
                        <option value="5" selected="">
                          5
                        </option>
                        <option value="10" selected="">
                          10
                        </option>
                        <option value="15" selected="">
                          15
                        </option>
                        <option value="20" selected="">
                          20
                        </option>
                      </select>
                    </div>
                    <div class="col">
                      <select
                        class="form-control"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "rgba(243,243,243,0)",
                          color: "rgb(255,255,255)",
                          borderWidth: "1.5px",
                          borderColor: "rgb(252,252,252)",
                        }}
                        onChange={(e) => {
                          setReps(e.target.value);
                        }}
                      >
                        <option value="reps" selected="">
                          reps
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>

                  {/* Workout 1 End */}

                  <div class="form-row" style={{ margin: "10px 0px" }}>
                    <div class="col text-center">
                      <button class="btn btn-primary" type="submit">
                        Add Workout Plan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card" style={{ borderRadius: "15px" }}>
              <div
                class="card-body"
                style={{
                  borderRadius: "15px",
                  boxShadow: "4px 5px 7px rgba(68,69,69,0.44)",
                  backgroundImage: `url(${BackgroundMeal})`,
                  backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                  backgroundSize: "cover",
                  backgroundOpacity: 0.5,
                }}
              >
                <form onSubmit={onSubmitMeal}>
                  {/* Meal 1 */}
                  <div class="form-row" style={{ margin: "10px 0px" }}>
                    <div class="col">
                      <select
                        class="form-control"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "rgba(243,243,243,0)",
                          color: "rgb(255,255,255)",
                          borderWidth: "1.5px",
                          borderColor: "rgb(252,252,252)",
                        }}
                        onChange={(e) => {
                          setMealName(e.target.value);
                        }}
                      >
                        {mealList.map((currentMeal) => {
                          return (
                            <option value={currentMeal.MealName} selected="">
                              {currentMeal.MealName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div class="col">
                      <select
                        class="form-control"
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "rgba(243,243,243,0)",
                          color: "rgb(255,255,255)",
                          borderWidth: "1.5px",
                          borderColor: "rgb(252,252,252)",
                        }}
                        onChange={(e) => {
                          setMealTime(e.target.value);
                        }}
                      >
                        <option value="Breakfast" selected="">
                          Breakfast
                        </option>
                        <option value="Lunch" selected="">
                          Lunch
                        </option>
                        <option value="Dinner" selected="">
                          Dinner
                        </option>
                      </select>
                    </div>
                  </div>
                  {/* End of Meal 1 */}

                  <div class="form-row" style={{ margin: "10px 0px" }}>
                    <div class="col text-center">
                      <button class="btn btn-primary" type="submit">
                        Add Meal Plan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <ul class="list-group">
          <li class="list-group-item active">Workout Plan </li>
          {workoutPlan.map((currentWorkout) => {
            return (
              <li class="list-group-item">
                {currentWorkout.exercise} &nbsp;&nbsp;
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-trash-fill"
                  fill="red"
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    axios
                      .delete(
                        "http://localhost:5000/api/profile/workoutplan/" +
                          profileID +
                          "/" +
                          currentWorkout._id
                      )
                      .then((response) => {
                        console.log(response);
                        alert("Exercise Deleted");

                        //refresh Data After Deletion

                        axios
                          .get(
                            "http://localhost:5000/api/profile/user/" +
                              profileID
                          )
                          .then((res) => {
                            console.log(
                              "Profile Details " + res.data.workoutplan
                            );
                            console.log(
                              "Profile workoutplan length " +
                                res.data.workoutplan.length
                            );
                            if (res.data.workoutplan.length > 0) {
                              setWorkoutPlan(res.data.workoutplan);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        alert(err);
                      });
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                  />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
