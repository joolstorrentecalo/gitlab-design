<!--

Title should be: UX Scorecard - {{Stage Group}} FY{{YY}}-Q{{quarter number}} - {{Title or Description of the Evaluated Workflow / JTBD}}
(e.g. “UX Scorecard - Create:Source Code FY21-Q1 - Obtaining screenshots from testing artifacts)

If this UX Scorecard is related to an OKR, append ~OKR to the /label quick action below to automatically add the 'OKR' label.

-->

/label ~"UX scorecard"  ~"type::ignore"

### Details
- **Job**: {{what is the relevant [Job](https://handbook.gitlab.com/handbook/product/ux/jobs-to-be-done/jtbd_topics__definitions/#job-types) to be scored}}
- **Job Performer**: {{list the Job Performer}}
- **Scenario**: {{what is the scenario you'll provide to participants or reference for evaluations}}
- **Related group(s)**: {{list the groups this job/scenario relate to}}

### Assets
- **FigJam canvas**: {{optional: add link to FigJam}}
- **Walkthrough video**: {{add link to YouTube Unfiltered video}}
- **DoveTail project**: {{link to the DoveTail project used to capture interview recordings}}

### Scoring & Recommendations
- **Recommendations**: {{add link to your recommendation issue/s}}
- **Previous score and scorecard**: {{if applicable, add previous baseline score and link to past scorecard issue}}
- **Score**: {{add new score}}

## Checklist

[Learn more about UX Scorecards](https://about.gitlab.com/handbook/product/ux/ux-scorecards/)
All scorecards for every stage group can be found under the [main scorecard epic](https://gitlab.com/groups/gitlab-org/-/epics/1714).

### Evaluate the experience
1. [ ] Add this issue to the stage group epic for the corresponding UX scorecards. Verify that the "UX scorecard" label is applied.
1. [ ] Choose the job to be evaluated.
    - If your job spans more than one stage group, that’s great! Review your job with a designer from that stage group for accuracy.
1. [ ] Make note of who is the Performer for the job.
1. [ ] Craft the scenario based on the job and Performer. This will help set the scene for participants when asking them to complete the job using GitLab.
    1. [ ] Consider whether you need to include additional scenarios related to onboarding.
1. [ ] Determine which [evaluation method](https://handbook.gitlab.com/handbook/product/ux/ux-scorecards/#scorecard-approach) to conduct. 
    - The preferred method is [formative](https://handbook.gitlab.com/handbook/product/ux/ux-scorecards/#option-b-perform-a-formative-evaluation) and requires external participants when establishing a baseline.
1. [ ] If conducting a heuristic evaluation, evaluate the current experience and note where you expect a user's high and low points to be. Capture the screens and jot down observations.
1. [ ] If conducting a formative evaluation, note where you witnessed users' high and low points. Capture the screens and jot down observations.
1. [ ] Use the [**Grading Rubric**](https://about.gitlab.com/handbook/product/ux/ux-scorecards/#grading-rubric) to provide an overall measurement that becomes the **score** for the experience (one grade per job), and add it to this issue's description. Document the score in the [UX Scorecard Spreadsheet](https://docs.google.com/spreadsheets/d/1iw5oj12QdLHOADV8P6ICE3P1U32eKMstpkIR4sPJRTo/edit?usp=sharing).
1. [ ] Create a walkthrough video that documents what you experienced/witnessed within the existing experience. Begin the video with a contextual introduction including: the job, the Performer, the scenario, and how you acquired the data (ex: internal or external users, or self-heuristic evaluation). This is not a "how to" video, but instead should help build empathy for users by clearly showing areas of potential frustration and confusion. (You can point out where the experience is positive, too.) At the end of the video, make sure to include narration of the score. Examples [here](https://www.youtube.com/watch?v=wCnpEGhS8uk&feature=youtu.be) and [here](https://www.youtube.com/watch?v=MkTOwTxsoL8).
   - If you're re-scoring the experience, walkthrough the entire flow again. For narration, you can highlight the recent improvements but still call out any areas that could still use some tweaking (in the next round of iterations, if applicable). The re-score video, in theory, should be shorter since we've hopefully eliminated a few bumps in the user flow.
   - The walkthrough video shouldn't take you long to create. Don't worry about it being polished or perfect, it's more important to be informative.
1. [ ] Tag PM and UX DRIs in this issue to share findings.
1. [ ] Post your video to the [GitLab Unfiltered YouTube](https://www.youtube.com/channel/UCMtZ0sc1HHNtGGWZFDRTh5A) channel, and link to it from this issue's description.
1. [ ] Link to your video in the [Engineering Week in Review](https://docs.google.com/document/d/1JBdCl3MAOSdlgq3kzzRmtzTsFWsTIQ9iQg0RHhMht6E/edit?usp=sharing) and [Product Division Monthly Sync](https://docs.google.com/document/d/127ynPa3gPtnI0K3hsdTuDk8Or2AOvnzn16lbFY5BHvw/edit?usp=sharing).
1. [ ] Create a new [Dovetail project using the UX scorecard template](https://dovetailapp.com/projects/new). Use insights to document any observations or findings that came out of this scorecard. You can use your experience map or video summary to help you curate those. It is important to add insights into Dovetail so they can be shared and accessed by all groups, and used to document cross-stage findings. You can also add any supporting material in Data but it is not required. Example [here](https://dovetailapp.com/projects/6NgpbSMFEDtQIBLPP71F5F/readme).

### Recommend improvements or next steps
1. [ ] Brainstorm opportunities to fix or improve areas of the experience.
   - Use the findings from the Emotional Grading scale to determine areas of immediate focus. For example, if parts of the experience received a “Negative” Emotional Grade, consider addressing those first. 
1. [ ] Create actionable issues for each opportunity. Your recommendation issues should be actionable and specific. 
    - If you know what the solution or next step is, then describe that so another person could continue with it. If you can include designs and set the issue to "workflow::ready for development", even better! If the solution or next steps are not clear, then describe the work needed to make progress. For example, "Identify accessibility improvements needed for date picker" is better than "Fix accessibility issues".
    - You may use one of the [Actionable Insight templates](https://about.gitlab.com/handbook/product/ux/ux-research/research-insights/#how-to-document-actionable-insights) in the GitLab project, depending on if it relates to a [product change](https://gitlab.com/gitlab-org/gitlab/-/blob/master/.gitlab/issue_templates/Actionable%20Insight%20-%20Product%20change.md) or [needs more exploration](https://gitlab.com/gitlab-org/gitlab/-/blob/master/.gitlab/issue_templates/Actionable%20Insight%20-%20Exploration%20needed.md). 
1. [ ] Label the issues appropriately. Add a `UX scorecard-rec` label for traceability. To help with prioritization, add a [severity label](https://about.gitlab.com/handbook/engineering/quality/issue-triage/#severity) to communicate appropriate urgency and impact. 
1. [ ] Add the recommendation issues to this issue as related items.
   - Recommendations do not need to be documented in your Dovetail project.
1. [ ] Think iteratively, and create dependencies where appropriate, remembering that sometimes the order of what we release is just as important as what we release.
   - If you need to break recommendations into phases or over multiple milestones, you can use an epic to organize the work. 
