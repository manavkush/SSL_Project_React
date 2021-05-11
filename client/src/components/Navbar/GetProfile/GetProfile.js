import React from "react";
import Swal from "sweetalert2";

const GetProfile = ({ email }) => {
  return Swal.fire({
    title: "Look Up Profile Details?",
    showCancelButton: true,
    confirmButtonText: "Look Up",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: { email } }),
      };
      return fetch(`/getProfile`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(result.value.Status);
      if (result.value.Status) {
        Swal.fire({
          icon: "info",
          title: "Hello!",
          html:
            `<div style=text-align:start>` +
            `<b>User name: </b> ${result.value.student_name} <br>` +
            `<b>Roll number: </b> ${result.value.student_rollno} <br>` +
            `<b>Branch :  </b> ${result.value.student_branch} <br>` +
            `<b>Due amount (in Rs.): ${result.value.student_due} <br>` +
            `</div>`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: `${result.value.StatusMessage}`,
        });
      }
    }
  });
};

export default GetProfile;
