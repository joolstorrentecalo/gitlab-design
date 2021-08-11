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
+- **Walkthrough deck**: {{add link to deck used in Youtube video if applicable. This step is optional and we encourage you to skip this unless it helps you to communicate your findings}}
- **Scoring Notes**: {{add link to [UX Scorecard Scoring template](https://docs.google.com/spreadsheets/d/1Z_70fDg578wu8j_kta3vSLOHWv-BEJ1zuqniyBQUTeI/edit#gid=0), if used}}
- **Recommendations**: {{add link to your recommendation issue/s}}

## UX Scorecard Checklist

[Learn more about UX Scorecards](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/)

1. [ ] Add this issue to the stage group epic for the corresponding UX scorecards. Verify that the "UX scorecard" label is applied.
1. [ ] After working with your PM to identify a top job, write it using the Job to Be Done (JTBD) format: When [situation], I want to [motivation], so I can [expected outcome]. Review with your manager to ensure your JTBD is written at the appropriate level. Remember, a JTBD is not a user story, it should not directly reference a solution and should be tool agnostic.
1. [ ] Create script scenarios based on your selected Job. The number of scenarios used per job statement often depends on the complexity of the features tested.
1. [ ] Make note of which [personas](https://about.gitlab.com/handbook/marketing/product-marketing/roles-personas/) might be performing the job, and link to them from this issue's description. Keeping personas in mind allows us to make the best decisions to address specific problems and pain points. Note: Do not include a persona in your JTBD format, as multiple types of users may complete the same job.
1. [ ] If your JTBD spans more than one stage group, that’s great! Review your JTBD with a designer from that stage group for accuracy.
1. [ ] Consider whether you need to include additional scenarios related to onboarding.
1. [ ] Review the current experience, noting where you expect a user's high and low points to be based on our [UX Heuristics](https://about.gitlab.com/handbook/engineering/ux/heuristics/). Using an experience map, such as the one found in [this template](https://app.mural.co/template/6b2c082d-d81a-4a3b-9fff-37525ac9e173/dcdc71d4-1fce-4fe1-ae98-81267bd232ea), capture the screens and jot down observations. Ideally, use our [scoring template](https://docs.google.com/spreadsheets/d/1Z_70fDg578wu8j_kta3vSLOHWv-BEJ1zuqniyBQUTeI/edit#gid=0).
   - If you're re-scoring the experience, review the entire flow, but feel free to reuse existing artifacts (i.e. a UI screen that wasn't changed).
1. [ ] Have internal or external users accomplish the JTBD. Record this session and document their experience. Note that 3-5 users are preferred, as this provides valuable insights and removes subjectivity. Make sure to avoid setting up a task-based usability study. The goal is to provide the participant context (the JTBD) and listen and watch how they attempt to complete the job. What we learn may differ from participant to participant. 
     - If it's not possible to have internal or external users go through the experience, a heuristic evaluation can be done instead.
1. [ ] Use the [**Grading Rubric**](https://about.gitlab.com/handbook/engineering/ux/heuristics/#scoring) to provide an overall measurement that becomes the **Benchmark score** for the experience (one grade per JTBD), and add it to this issue's description. Document the score in the [UX Scorecard Spreadsheet](https://drive.google.com/drive/u/0/search?lfhs=2&q=ux%20scorecard%20scoring%20template).
1. [ ] Once testing is complete, create a walkthrough video that documents what you experienced/witnessed within the existing experience. Begin the video with a contextual introduction including: your role, stage group, specifiy how you acquired the data (ex: internal or external users, or self-heurisitic evaluation), and a short introduction to your JTBD and purpose of the UX scorecard. This is not a "how to" video, but instead should help build empathy for users by clearly showing areas of potential frustration and confusion. (You can point out where the experience is positive, too.) At the end of the video, make sure to include narration of the Benchmark Score. Examples [here](https://www.youtube.com/watch?v=wCnpEGhS8uk&feature=youtu.be) and [here](https://www.youtube.com/watch?v=MkTOwTxsoL8).
   - If you're re-scoring the experience, walkthrough the entire flow again. For narration, you can highlight the recent improvements but still call out any areas that could still use some tweaking (in the next round of iterations, if applicable). The re-score video, in theory, should be shorter since we've hopefully eliminated a few bumps in the user flow.
   - The walkthrough video shouldn't take you long to create. Don't worry about it being polished or perfect, it's more important to be informative.
1. [ ] Post your video to the [GitLab Unfiltered YouTube](https://www.youtube.com/channel/UCMtZ0sc1HHNtGGWZFDRTh5A) channel, and link to it from this issue's description.
1. [ ] Link to your video in the [Engineering Week in Review](https://docs.google.com/document/d/1EkfzI85aqw8chYDBf2GLRvjKEa3s0FWHMI3u0DIr-xg/edit).
1. [ ] [Create a recommendation issue](https://gitlab.com/gitlab-org/gitlab-design/issues/new?issuable_template=UX%20Scorecard%20Part%202) for this JTBD and add it to the same stage group epic as this issue. Also add a link to your recommendation issue to this issue.
