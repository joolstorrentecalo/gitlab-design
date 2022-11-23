<!--

Title should be: UX Scorecard - {{Stage Group}} FY{{YY}}-Q{{quarter number}} - {{Title or Description of the Evaluated Workflow / JTBD}}
(e.g. “UX Scorecard - Create:Source Code FY21-Q1 - Obtaining screenshots from testing artifacts)

If this UX Scorecard is related to an OKR, append ~OKR to the /label quick action below to automatically add the 'OKR' label.

-->

/label ~"UX scorecard" ~"type::ignore"

- **Personas**: {{add links to related personas}}
- **Previous score and scorecard**: {{if applicable, add previous benchmark score and link to scorecard issue}}
- **Benchmark score**: {{add benchmark score}}
- **Walkthrough video**: {{add link to YouTube video}}
- **Walkthrough deck**: {{add link to deck used in Youtube video if applicable. This step is optional and we encourage you to skip this unless it helps you to communicate your findings}}

- **Recommendations**: {{add link to your recommendation issue/s}}

## UX Scorecard Checklist

[Learn more about UX Scorecards](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/)

1. [ ] Add this issue to the stage group epic for the corresponding UX scorecards. Verify that the "UX scorecard" label is applied.
1. [ ] Work with your PM to identify a top [Job to be Done](https://about.gitlab.com/handbook/engineering/ux/jobs-to-be-done/) (JTBD). All GitLab JTBD can be found in the [jobs-to-be-done.yml file](https://gitlab.com/gitlab-com/www-gitlab-com/-/blob/master/data/jobs_to_be_done.yml). If creating a new job, write it using the JTBD format: When [situation], I want to [job], so I can [expected outcome]. Review with your manager to ensure your JTBD is written at the appropriate level. Remember, a JTBD is not a user story, it should not directly reference a solution and should be tool agnostic. 
1. [ ] Make note of which [personas](https://about.gitlab.com/handbook/marketing/product-marketing/roles-personas/) might be performing the job, and link to them from this issue's description. Keeping personas in mind allows us to make the best decisions to address specific problems and pain points. Note: Do not include a persona in your JTBD format, as multiple types of users may complete the same job.
1. [ ] If your JTBD spans more than one stage group, that’s great! Review your JTBD with a designer from that stage group for accuracy.
1. [ ] Add any new JTBD to the SSOT [jobs-to-be-done.yml file](https://gitlab.com/gitlab-com/www-gitlab-com/-/blob/master/data/jobs_to_be_done.yml)
1. [ ] Consider whether you need to include additional scenarios related to onboarding.
1. [ ] Select the [appropriate scorecard approach](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/#scorecard-approach) and evaluate the current experience. 
1. [ ] Use the [**Grading Rubric**](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/#grading-rubric) to provide an overall measurement that becomes the **Benchmark score** for the experience (one grade per JTBD), and add it to this issue's description. Document the score in the [UX Scorecard Spreadsheet](https://docs.google.com/spreadsheets/d/1iw5oj12QdLHOADV8P6ICE3P1U32eKMstpkIR4sPJRTo/edit?usp=sharing).
1. [ ] Once testing is complete, create a walkthrough video that documents what you experienced/witnessed within the existing experience. Begin the video with a contextual introduction including: your role, stage group, specify how you acquired the data (ex: internal or external users, or self-heuristic evaluation), and a short introduction to your JTBD and purpose of the UX scorecard. This is not a "how to" video, but instead should help build empathy for users by clearly showing areas of potential frustration and confusion. (You can point out where the experience is positive, too.) At the end of the video, make sure to include narration of the Benchmark Score. Examples [here](https://www.youtube.com/watch?v=wCnpEGhS8uk&feature=youtu.be) and [here](https://www.youtube.com/watch?v=MkTOwTxsoL8).
   - If you're re-scoring the experience, walkthrough the entire flow again. For narration, you can highlight the recent improvements but still call out any areas that could still use some tweaking (in the next round of iterations, if applicable). The re-score video, in theory, should be shorter since we've hopefully eliminated a few bumps in the user flow.
   - The walkthrough video shouldn't take you long to create. Don't worry about it being polished or perfect, it's more important to be informative.
1. [ ] Post your video to the [GitLab Unfiltered YouTube](https://www.youtube.com/channel/UCMtZ0sc1HHNtGGWZFDRTh5A) channel, and link to it from this issue's description.
1. [ ] Link to your video in the [Engineering Week in Review](https://docs.google.com/document/d/1JBdCl3MAOSdlgq3kzzRmtzTsFWsTIQ9iQg0RHhMht6E/edit?usp=sharing).
1. [ ] Create a new [Dovetail project using the UX scorecard template](https://dovetailapp.com/projects/new). Use insights to document any observations or findings that came out of this scorecard. You can use your experience map or video summary to help you curate those. It is important to add insights into Dovetail so they can be shared and accessed by all groups, and used to document cross-stage findings. You can also add any supporting material in Data, such as an exported Mural experience map, but it is not required. Example [here](https://dovetailapp.com/projects/6NgpbSMFEDtQIBLPP71F5F/readme).
1. [ ] [Create a recommendation issue](https://gitlab.com/gitlab-org/gitlab-design/issues/new?issuable_template=UX%20Scorecard%20Part%202) for this JTBD and add it to the same stage group epic as this issue. Also add a link to your recommendation issue to this issue.
