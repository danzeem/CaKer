const jobsLoading = document.getElementById("jobs");
const jobsError = document.getElementById("jobsError");
const jobsContainer = document.querySelector(".flex-container");
const trackContainer = document.querySelector(".track .container .flex-container ");
const appliedCount = document.querySelector(".applied .count");
const interviewCount = document.querySelector(".interview .count");
const offerCount = document.querySelector(".offer .count");
const rejectedCount = document.querySelector(".rejected .count");
const applyJobSubmitBtn = document.querySelector('.form button[type="submit"]');
const applyJobForm = document.querySelector('form');
const trackStatusDropdown = document.querySelector('.track .container #status');
const jobApplicationTrackDropdown = document.querySelector('.track .container #application-status');
const jobApplicationUpdateStatusDropdown = document.querySelector('select#update-status');

const updateSubmitBtn = document.querySelector('#update-submit');

let untrackedJobs = [];
let trackedJobs = [];
let rejectedJobs = [];
let interviewJobs = [];
let offeredJobs = [
    {
        company_name: "NVIDIA",
        title: "Software intern",
        description: "First choice",
        date: "24/5/2027",
        status: "Offered"
    }, {
        company_name: "AMD",
        title: "Software intern",
        description: "First choice",
        date: "24/5/2027",
        status: "Offered"
    }
];
let combinedJobs = [];
//EFFECTS: Getting data from API
async function fetchJobs() {
    try {
        const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        untrackedJobs = response.data.data;
        const jobs = untrackedJobs.slice(0, 10).map(job => createJobCard(job));
        jobsContainer.innerHTML = jobs.join(" ");
    } catch (error) {
        jobsError.style.display = "block";
    } finally {
        jobsLoading.style.display = "none";
    }
}

//EFFECTS: form submission value will be added to the applied job array.
// and the job application will be rendered automatically. 
applyJobForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const company = document.querySelector('input[type="text"]#company');
    const position = document.querySelector('input[type="text"]#position');
    const formStatus = document.querySelector('form select#status');
    const notes = document.querySelector('textarea#notes');
    const date = document.querySelector('input[type="date"]');
    const job = {
        company_name: company.value,
        title: position.value,
        description: notes.value,
        date: date.value,
        status: formStatus.value
    };
    addJob(job);
    applyJobForm.reset();
    renderCount();
    renderUpdateApplication();

});
function addJob(job) {
    if (job.status === "Applied") {
        trackedJobs.push(job);
    } else if (job.status === "Interview") {
        interviewJobs.push(job);
    } else if (job.status === "Offered") {
        offeredJobs.push(job);
    } else if (job.status === "Rejected") {
        rejectedJobs.push(job);
    }

    
}

// EFFECTS: Creating 10 jobs to be displayed on the job finding section 
function createJobCard(job) {
    const jobDescription = job.description.replace(/<[^>]*>/g, ' ').slice(0, 150);
    const tags = job.job_types.map(type => `<span class="tag">${type}</span>`).join(" ");
    return `
    <div class="sub-section">
        <div class="job-header">
            <h4>${job.title}</h4>
            ${tags}
        </div>
        <p class="place">${job.company_name}</p>
        <p class="notes">${jobDescription}</p>
    <div class="actions">
        <input onclick="window.open('${job.url}', '_blank')" type="submit" value="View posting" class="btn-outline">
        <input type="submit" value="Save to tracker" class="btnFilled" data-company ="${job.company_name}" data-position="${job.title}">
    </div>
    </div>    
  `;
}
fetchJobs();
// EFFECTS: Mark the job as tracked and add it to the tracked list
// and the track and update section will be re rendered with the current tracked list 
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("btnFilled")) {
        const subSection = e.target.closest(".sub-section");
        const title = subSection.querySelector("h4").textContent;
        const place = subSection.querySelector(".place").textContent;
        subSection.classList.add("done");
        subSection.querySelector(".notes").remove();
        subSection.querySelector(".actions input").remove();
        subSection.querySelector(".actions input").remove();

        const savedBtn = document.createElement("input");
        savedBtn.value = "Already in tracker";
        savedBtn.disabled = true;
        savedBtn.type = "submit";
        subSection.querySelector(".actions").append(savedBtn);

        const currentDate = new Date().toLocaleDateString('en-GB');
        const jobTracked = untrackedJobs.find(job => job.title === title && job.company_name === place);
        jobTracked.date = currentDate;
        jobTracked.status = "Applied";
        trackedJobs.push(jobTracked);
        renderJobTracking();
    }
});
//EFFECTS: Delete the job from array and re-render from the application
document.addEventListener('click', function (event) {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains('delete-btn')) {

        // Find the nearest parent section with the class 'card-section'
        const section = event.target.closest('.application-box');
        const company = section.querySelector('.company').textContent;
        const title = section.querySelector('.position').textContent;
        console.log(company);
        console.log(title);
        const jobTarget = combinedJobs.find(job => job.title === title && job.company_name === company);

        // Remove the section from the DOM if found
        if (section) {
            section.remove();
            console.log(jobTarget)
            deleteJobFromPreviousStatus(jobTarget, jobTarget.status);
            renderCount();
            renderUpdateApplication();

        }
    }
});

// Update total job application status count 
function renderCount() {
    appliedCount.textContent = trackedJobs.length;
    interviewCount.textContent = interviewJobs.length;
    rejectedCount.textContent = rejectedJobs.length;
    offerCount.textContent = offeredJobs.length;
}

function renderUpdateApplication() {
    combinedJobs = [...trackedJobs, ...rejectedJobs, ...interviewJobs, ...offeredJobs];
    const jobs = combinedJobs.map((job) => {
        return `<option value="${job.company_name}-${job.title}">${job.company_name} - ${job.title}</option>`
    });
    jobApplicationTrackDropdown.innerHTML = jobs.join(" ");
}


function renderJobTracking() {
    const jobs = trackedJobs.map(job => createJobApplied(job));
    trackContainer.innerHTML = jobs.join(" ");
    renderCount();
    renderUpdateApplication();
}

function deleteJobFromPreviousStatus(job, previousStatus) {
    if (previousStatus === "Applied") {
        trackedJobs = trackedJobs.filter(item => item !== job);
    } else if (previousStatus === "Interview") {
        interviewJobs = interviewJobs.filter(item => item !== job);
    } else if (previousStatus === "Offered") {
        offeredJobs = offeredJobs.filter(item => item !== job);
    } else if (previousStatus === "Rejected") {
        rejectedJobs = rejectedJobs.filter(item => item !== job);
    }
}

updateSubmitBtn.addEventListener('click', () => {
    const jobApplicationDropdownValue = jobApplicationTrackDropdown.value;
    const jobTarget = combinedJobs.find(job => `${job.company_name}-${job.title}` === jobApplicationDropdownValue);
    if (jobApplicationUpdateStatusDropdown.value === "Applied") {
        deleteJobFromPreviousStatus(jobTarget, jobTarget.status);
        jobTarget.status = "Applied";
        trackedJobs.push(jobTarget);
    } else if (jobApplicationUpdateStatusDropdown.value === "Interview") {
        deleteJobFromPreviousStatus(jobTarget, jobTarget.status);
        jobTarget.status = "Interview";
        interviewJobs.push(jobTarget);
    } else if (jobApplicationUpdateStatusDropdown.value === "Offered") {
        deleteJobFromPreviousStatus(jobTarget, jobTarget.status);
        jobTarget.status = "Offered";
        offeredJobs.push(jobTarget);
    } else if (jobApplicationUpdateStatusDropdown.value === "Rejected") {
        deleteJobFromPreviousStatus(jobTarget, jobTarget.status);
        jobTarget.status = "Rejected";
        rejectedJobs.push(jobTarget);
    }
    renderCount();
    renderUpdateApplication();
});

trackStatusDropdown.addEventListener('change', (event) => {
    let jobs = [];
    if (event.target.value === "Applied") {
        jobs = trackedJobs.map(job => createJobApplied(job));
    } else if (event.target.value === "Interview") {
        jobs = interviewJobs.map(job => createJobApplied(job));
    } else if (event.target.value === "Offered") {
        jobs = offeredJobs.map(job => createJobApplied(job));
    } else if (event.target.value === "Rejected") {
        jobs = rejectedJobs.map(job => createJobApplied(job));
    }
    trackContainer.innerHTML = jobs.join(" ");

    renderCount();

});


function createJobApplied(job) {
    const jobDescription = job.description.replace(/<[^>]*>/g, ' ').slice(0, 150);
    return `
        <div class="application-box applied">
            <p class="company">${job.company_name}</p>
            <p class="description position">${job.title}</p>
            <p class="description status">Status: ${job.status}</p>
            <p class="description notes">Notes: ${jobDescription}</p>
            <input class = "delete-btn" type="submit" value="Delete">
            <p class="description date">Applied: ${job.date}</p>
        </div>
    `;
}
renderJobTracking();

