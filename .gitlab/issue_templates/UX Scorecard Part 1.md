<!--
 
Title should be: UX Scorecard - {{Stage Group}} FY{{YY}}-Q{{quarter number}} - {{Title or Description of the Evaluated Workflow / JTBD}}
(e.g. “UX Scorecard - Create:Source Code FY21-Q1 - Obtaining screenshots from testing artifacts)

If this UX Scorecard is related to an OKR, append ~OKR to the /label quick action below to automatically add the 'OKR' label.

-->

/label ~"UX scorecard" 

- **Personas**: {{add links to related personas}}
- **Previous score and scorecard**: {{if applicable, add previous benchmark score and link to scorecard issue}}
- **Benchmark score**: {{add benchmark score}}
- **Walkthrough video**: {{add link to YouTube video}}
- **Recommendations**: {{add link to your recommendation issue/s}}

## UX Scorecard Checklist

[Learn more about UX Scorecards](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/)

1. [ ] Add this issue to the stage group epic for the corresponding quarter's UX scorecards.
1. [ ] After working with your PM to identify a top job, write it using the Job to Be Done (JTBD) format: When [situation], I want to [motivation], so I can [expected outcome]. Review with your manager to ensure your JTBD is written at the appropriate level. Remember, a JTBD is not a user story and should not lead directly to a solution.
1. [ ] Make note of which [personas](https://about.gitlab.com/handbook/marketing/product-marketing/roles-personas/) might be performing the job, and link to them from this issue's description. Keeping personas in mind allows us to make the best decisions to address specific problems and pain points. Note: Do not include a persona in your JTBD format, as multiple types of users may complete the same job.
1. [ ] If your JTBD spans more than one stage group, that’s great! Review your JTBD with a designer from that stage group for accuracy.
1. [ ] Review the current experience, noting where you expect a user's high and low points to be. Capture the screens and jot down observations.
   - If you're re-scoring the experience, recapture the entire flow. You will likely have some of the artifacts (i.e. a UI screen that wasn't changed) that you can simply reuse.
1. [ ] It's also advised that you ask an actual user to accomplish the JTBD. Record this session and document their experience. Note that 3-5 additional users are preferred, as this provides valuable insights and removes subjectivity. Make sure to avoid setting up a task-based usability study. The goal is to provide the participant context (the JTBD) and listen and watch how they attempt to complete the job. What we learn may differ from participant to participant. 
1. [ ] Using what you learned in the previous steps, apply the following **Emotional Grading Scale** to document how a user likely feels at each step of the workflow. Add this documentation to this issue's description.
   - **Positive:** The user’s experience included a pleasant surprise — something they were not expecting to see. The user enjoyed the experience on the screen and could complete the task, effortlessly moving forward without having to stop and reassess their workflow. *Emotion(s): Happy, Motivated, Possibly Surprised*
   - **Neutral:** The user’s expectations were met. Each action provided the basic expected response from the UI, so that the user could complete the task and move forward. *Emotion(s): Indifferent*
   - **Negative:** The user did not receive the results they were expecting. There may be bugs, roadblocks, or confusion about what to click on that prevents the user from completing the task. Maybe they even needed to find an alternative method to achieve their goal. *Emotion(s): Angry, Frustrated, Confused, Annoyed*
1. [ ] Use the [**Grading Rubric**](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/#grading-rubric) to provide an overall measurement that becomes the **Benchmark score** for the experience (one grade per JTBD), and add it to this issue's description. Document the score in the [UX Scorecard Spreadsheet](https://docs.google.com/spreadsheets/d/1iw5oj12QdLHOADV8P6ICE3P1U32eKMstpkIR4sPJRTo/edit#gid=0).
1. [ ] Once you’re clear about the user’s path, create a walkthrough video that documents the existing experience. Begin the video with a contextual introduction including: your role, stage group, and a short introduction to your JTBD and purpose of the UX scorecard. This is not a "how to" video, but instead should help build empathy for users by clearly showing areas of potential frustration and confusion. (You can point out where the experience is positive, too.) The Emotional Grading Scale you documented earlier will help identify areas to call out. At the end of the video, make sure to include narration of the Benchmark Score. Examples [here](https://www.youtube.com/watch?v=wCnpEGhS8uk&feature=youtu.be) and [here](https://www.youtube.com/watch?v=MkTOwTxsoL8).
   - If you're re-scoring the experience, walkthrough the entire flow again. For narration, you can highlight the recent improvements but still call out any areas that could still use some tweaking (in the next round of iterations, if applicable). The re-score video, in theory, should be shorter since we've hopefully eliminated a few bumps in the user flow.
1. [ ] Post your video to the [GitLab Unfiltered YouTube](https://www.youtube.com/channel/UCMtZ0sc1HHNtGGWZFDRTh5A) channel, and link to it from this issue's description.
1. [ ] Link to your video in the [Engineering Week in Review](https://docs.google.com/document/d/1EkfzI85aqw8chYDBf2GLRvjKEa3s0FWHMI3u0DIr-xg/edit).
1. [ ] [Create a recommendation issue](https://gitlab.com/gitlab-org/gitlab-design/issues/new?issuable_template=UX%20Scorecard%20Part%202) for this JTBD and add it to the same stage group epic as this issue.
1. [ ] Following the [UX Scorecards setup instructions](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/#setup), create an issue (and epic, if needed) to rescore the same JTBD the following quarter to see if we have made improvements. We will use the grades to monitor progress toward improving the overall quality of our user experience. Add that issue as related to this issue.
