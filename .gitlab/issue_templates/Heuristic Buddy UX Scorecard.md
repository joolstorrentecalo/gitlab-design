<!--
 
Title should be: UX Scorecard - {{Stage Group}} FY{{YY}}-Q{{quarter number}} - {{Title or Description of the Evaluated Workflow / JTBD}}
(e.g. “UX Scorecard - Create:Source Code FY22-Q3 - Obtaining screenshots from testing artifacts)

If this UX Scorecard is related to an OKR, append ~OKR to the /label quick action below to automatically add the 'OKR' label.

If this UX Scorecard is related to SUS, append the ~"SUS" to the /label quick action below to automatically add the 'SUS' label.

-->

/label ~"UX scorecard" ~"OKR" ~"learnability"

- **Personas**: {{add links to related personas}}
- **Previous score and scorecard**: {{if applicable, add previous benchmark score and link to scorecard issue}}
- **Benchmark score**: {{add benchmark score}}
- **Walkthrough video**: {{add link to YouTube video}}
- **Walkthrough deck**: {{add link to deck used in Youtube video if applicable. This step is optional and we encourage you to skip this unless it helps you to communicate your findings}}
- **Recommendations**: {{add link to your recommendation issue/s}}

## Heuristic Buddy UX Scorecard Checklist

The Heuristic Buddy UX Scorecards are a twist on our UX Scorecard process. These are specifically designed to help identify areas of usability and learnability improvements. They are to be completed by a designer who does not work within the same product area(s) the job can be completed in. [Learn more about UX Scorecards](https://about.gitlab.com/handbook/product/ux/ux-scorecards/)

The initial preparation is completed by the Group Product Designer. When the preparation has been completed they will hand it over to the Heuristic Buddy to complete the evaluation who will hand it back to the Group Product Designer when completed to add any recommendations. Read through the steps below for details.

### Group Product Designer (Expert)

1. [ ] Add this issue to the stage group epic for the corresponding UX Scorecards. Verify that the `UX scorecard` and `OKR` labels are applied, then apply your `section` and `group` labels as well.
1. [ ] After working with your PM to identify a top job, write it using the Job to be Done (JTBD) format: `When [situation], I want to [motivation], so I can [expected outcome]`. Review with your manager to ensure your JTBD is written at the appropriate level. Remember, a JTBD is not a user story, it should not directly reference a solution and should be tool agnostic.
1. [ ] Create script scenario(s) based on your JTBD. The number of scenarios used per job statement often depends on the complexity of the features tested.
   1. Tip 1: You might find job statements to be too broad to serve as guidance for writing script scenarios. If that is the case, consider breaking the job statements down into user stories as an intermediary step. Then go back to draft your script scenario. 
   1. Tip 2: Keep in mind your buddy may be missing the subject matter knowledge needed to understand the script scenario. If needed, offer a brief, high-level overview of the job to give them context. Avoid going into details about how to perform tasks within GitLab.
1. [ ] Make note of which [personas](https://about.gitlab.com/handbook/product/personas/) might be performing the job, and link to them from this issue's description. Keeping personas in mind allows us to make the best decisions to address specific problems and pain points. Note: Do not include a persona in your JTBD format, as multiple types of users may complete the same job.
    1. [ ] Describe the characteristics this persona may impart if they were a new user for this job and the GitLab environment they will be joining. Consider that it most likely is not an empty group/project but instead could be an active team with multiple groups and repositories.
1. [ ] If your JTBD spans more than one stage group, that’s great! Review your JTBD with a designer from that stage group for accuracy. Note: This stage group's designer cannot be your Heuristic Buddy.
1. [ ] Setup the environment your Heuristic Buddy will need to use to complete their evaluation. Depending on your needs this may take several hours to setup, test and get right. Please plan accordingly.
    * This environment should attempt to replicate the most realistic scenario that's appropriate for your persona in a "new user" state. This may not be a brand new/empty project.
    * Think about your selected persona and what knowledge they might already bring to the table. Is there anything that you'd expect them to know about this space and environment that your Heuristic Buddy may not know? If so, write that out for them so they'll know what to do should they encounter that situation.
1. [ ] Create a new [Dovetail project using the UX scorecard template](https://dovetailapp.com/projects/new) and fill in the readme details. Your heuristic buddy will use this to document any observations or findings that come out of this scorecard. Add a link to the project in your issue description.
1. [ ] Ping your Heuristic Buddy and let them know it's ready for them to conduct the evaluation.
1. [ ] Work with your Heuristic Buddy to ensure they'll be evaluating GitLab in the correct environment setup that is appropriate to a new user attempting to complete the JTBD that you've selected. 
    * Be prepared to collaborate with your buddy should something come up unexpectadly.

### Heuristic Buddy (Evaluator)

1. [ ] Review the current experience, noting where you expect a user's high and low points to be based on our [UX Heuristics](https://about.gitlab.com/handbook/product/ux/heuristics/). Using an experience map, such as the one found in [this template](https://app.mural.co/template/6b2c082d-d81a-4a3b-9fff-37525ac9e173/dcdc71d4-1fce-4fe1-ae98-81267bd232ea), capture the screens and jot down observations.
    1. During the evaluation strive to wear the hat of the persona relevant to the JTBD and while doing so try to see the UI from their perspective as if they were a new user. 
    * If you should come across a problem with the environment or you simply get stuck, please reach out to your Group Product buddy to wokr together to figure out how to move forward.
    1. As you progress through your evaluation this will be easy to forget so it's recommended to put a reminder somewhere in your view, such as a post-it stuck on your monitor that says "You're a new user!"
1. [ ] Use the [**Grading Rubric**](https://about.gitlab.com/handbook/product/ux/heuristics/#scoring) to provide an overall measurement that becomes the **Benchmark score** for the experience (one grade per JTBD), and add it to this issue's description. Document the score in the [UX Scorecard Spreadsheet](https://docs.google.com/spreadsheets/d/1iw5oj12QdLHOADV8P6ICE3P1U32eKMstpkIR4sPJRTo/edit#gid=457126498).
1. [ ] Once you've completed your evaluation, create a walkthrough video that documents what you experienced when completing the job in GitLab. Begin the video with a contextual introduction including: 
    1. Your role, stage group
    1. Specify how you conducted the heuristic evaluation
    1. Add a short introduction describing the JTBD and the purpose of the UX scorecard (i.e. you're performing the evaluation in partnership with {stage group} and {product designer}. 
    1. This is not a "how-to" video, but instead should help build empathy for users by clearly showing areas of potential frustration and confusion. (You can point out where the experience is positive, too.) 
    1. At the end of the video, make sure to include narration of the Benchmark Score. Examples [here](https://www.youtube.com/watch?v=wCnpEGhS8uk&feature=youtu.be) and [here](https://www.youtube.com/watch?v=MkTOwTxsoL8).
   - The walkthrough video shouldn't take you long to create. Don't worry about it being polished or perfect, it's more important to be informative.
1. [ ] Post your video to the [GitLab Unfiltered YouTube](https://www.youtube.com/channel/UCMtZ0sc1HHNtGGWZFDRTh5A) channel, and link to it from this issue's description.
1. [ ] Link to your video in the [Engineering Week in Review](https://docs.google.com/document/d/1GQbnOP_lr9KVMVaBQx19WwKITCmh7H3YlgO-XqVwv0M/edit).
1. [ ] In the Dovetail project that your heuristic buddy created, use Insights to document any observations or findings that came out of this scorecard. You can use your experience map or video summary to help you curate those. It is important to add insights into Dovetail so they can be shared and accessed by all groups, and used to document cross-stage findings. You can also add any supporting material in Data, such as an exported Mural experience map, but it is not required. Example [here](https://dovetailapp.com/projects/6NgpbSMFEDtQIBLPP71F5F/readme).
1. [ ] Once the evaluation has been completed ping the Stage Group Product Designer in this issue letting them know it's ready for their review and recommendation creation.
1. [ ] _Optional_ – If you’d like to follow along and contribute to solution development, consider turning on notifications for each recommendation issue. 

### Group Product Designer (Expert) - Recommendation Creation

1. [ ] Collaborate with your Heuristic Buddy to create recommendation issues as needed. Create these using one of the [Actionable Insight templates](https://about.gitlab.com/handbook/product/ux/ux-research/research-insights/#how-to-document-actionable-insights) in the GitLab project, depending on if it relates to a [product change](https://gitlab.com/gitlab-org/gitlab/-/blob/master/.gitlab/issue_templates/Actionable%20Insight%20-%20Product%20change.md) or [needs more exploration](https://gitlab.com/gitlab-org/gitlab/-/blob/master/.gitlab/issue_templates/Actionable%20Insight%20-%20Exploration%20needed.md). 
    - Recommendations do not need to be documented in your Dovetail project.
1. [ ] Add a `UX scorecard-rec` and `OKR` label on every issue for traceability, then apply your `section` and `group` labels as well.
1. [ ] Add [Severity labels](https://about.gitlab.com/handbook/engineering/quality/issue-triage/#severity) to every issue for prioritization
1. [ ] Link your recommendation issues to your main UX Scorecard issue
1. Tip 1: Brainstorm opportunities to fix or improve areas of the experience.
    - Use the findings from the Emotional Grading scale to determine areas of immediate focus. For example, if parts of the experience received a “Negative” Emotional Grade, consider addressing those first.
1. Tip 2: Think iteratively, and create dependencies where appropriate, remembering that sometimes the order of what we release is just as important as what we release.
    - If you need to break recommendations into phases or over multiple milestones, create multiple epics and use the [Category Maturity Definitions](https://about.gitlab.com/direction/maturity/) in the title of each epic: **Minimal, Viable, Complete, or Lovable**.
