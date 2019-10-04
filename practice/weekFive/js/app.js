Vue.component("student-card", {
  props: ["student", "isactive"],
  template:
    "<div class='student' v-bind:class='{ cardActive:isactive, cardOut:!isactive, cardBack:!isactive }'>{{ student.name }} : {{ student.skill }}</div>"
});

var app = new Vue({
  el: "#app",
  data: {
    students: [
      { name: "Sienna", skill: 2, joy: 0 },
      { name: "Cyan", skill: 0, joy: 5 },
      { name: "Magenta", skill: 3, joy: 3 }
    ],
    currentStudent: { name: "Sienna", skill: 2, joy: 0 },
    curStudentId: 0,
    cardActive: true
  },
  methods: {
    arrowClicked: function() {
      this.cardActive = !this.cardActive;

      setTimeout(() => {
        //modify the skill of the current student
        //before moving onward:
        this.currentStudent.skill++;

        //iteration code
        this.curStudentId++;
        this.currentStudent = this.students[this.curStudentId];

        if (this.curStudentId >= this.students.length - 1) {
          this.curStudentId = -1;
        }

        //animation trigger
        this.cardActive = !this.cardActive;
      }, 300);
    },
    backArrowClicked: function() {
      console.log("fuk");
      this.cardActive = !this.cardActive;

      setTimeout(() => {
        //modify the skill of the current student
        //before moving onward:
        this.currentStudent.skill--;

        //iteration code
        this.curStudentId++;
        this.currentStudent = this.students[this.curStudentId];

        if (this.curStudentId >= this.students.length - 1) {
          this.curStudentId = -1;
        }

        //animation trigger
        this.cardActive = !this.cardActive;
      }, 300);
    }
  }
});

/*
setTimeout( () => {
        this.currentStudent.skill ++;
    
        this.curStudentId ++;
        if(this.curStudentId >= this.students.length) this.curStudentId = 0;
        this.currentStudent = this.students[this.curStudentId];
        this.cardActive = !this.cardActive;
    },
    300)
    cardOut:!isactive
    */
