<!--
 
Title should be: UX Scorecard - {{Stage Group}} FY{{YY}}-Q{{quarter number}} - {{Title or Description of the Evaluated Workflow / JTBD}}
(e.g. “UX Scorecard - Create:Source Code FY22-Q3 - Obtaining screenshots from testing artifacts)

If this UX Scorecard is related to an OKR, append ~OKR to the /label quick action below to automatically add the 'OKR' label.

If this UX Scorecard is related to SUS, append the ~"SUS" to the /label quick action below to automatically add the 'SUS' label.

-->

/label ~"UX scorecard-rec" 

- **Personas**: {{add links to related personas}}
- **Previous score and scorecard**: {{if applicable, add previous benchmark score and link to scorecard issue}}
- **Benchmark score**: {{add benchmark score}}
- **Walkthrough video**: {{add link to YouTube video}}
- **Walkthrough deck**: {{add link to deck used in Youtube video if applicable. This step is optional and we encourage you to skip this unless it helps you to communicate your findings}}
- **Recommendations**: {{add link to your recommendation issue/s}}

## Heuristic Buddy UX Scorecard Checklist

The Heuristic Buddy UX Scorecards are a twist on our UX Scorecard process. These are specifically designed to help identify areas of usability and learnability improvements. They are to be completed by a designer who does not work within the same product area(s) the job can be completed in. [Learn more about UX Scorecards](https://about.gitlab.com/handbook/engineering/ux/ux-scorecards/)

The initial preparation is completed by the Group Product Designer. When the preparation has been completed they will hand it over to the Heuristic Buddy to complete the evaluation who will hand it back to the Group Product Designer when completed to add any recommendations. Read through the steps below for details.

### Group Product Designer (Expert)

1. [ ] Add this issue to the stage group epic for the corresponding UX Scorecards. Verify that the "UX scorecard" label is applied.
1. [ ] After working with your PM to identify a top job, write it using the Job to be Done (JTBD) format: `When [situation], I want to [motivation], so I can [expected outcome]`. Review with your manager to ensure your JTBD is written at the appropriate level. Remember, a JTBD is not a user story, it should not directly reference a solution and should be tool agnostic.
1. [ ] Create script scenario(s) based on your JTBD. The number of scenarios used per job statement often depends on the complexity of the features tested.
   1. Tip 1: You might find job statements to be too broad to serve as guidance for writing script scenarios. If that is the case, consider breaking the job statements down into user stories as an intermediary step. Then go back to draft your script scenario. 
   1. Tip 2: Keep in mind your buddy may be missing the subject matter knowledge needed to understand the script scenario. If needed, offer a brief, high-level overview of the job to give them context. Avoid going into details about how to perform tasks within GitLab.
1. [ ] Make note of which [personas](https://about.gitlab.com/handbook/marketing/product-marketing/roles-personas/) might be performing the job, and link to them from this issue's description. Keeping personas in mind allows us to make the best decisions to address specific problems and pain points. Note: Do not include a persona in your JTBD format, as multiple types of users may complete the same job.
    1. [ ] Describe the characteristics this persona may impart if they were a new user for this job and the GitLab environment they will be joining. Consider that it most likely is not an empty group/project but instead could be an active team with multiple groups and repositories.
1. [ ] If your JTBD spans more than one stage group, that’s great! Review your JTBD with a designer from that stage group for accuracy. Note: This stage group's designer cannot be your Heuristic Buddy.
1. [ ] Ping your Heuristic Buddy and let them know it's ready for them to conduct the evaluation.
1. [ ] Work with your Heuristic Buddy to ensure they'll be evaluating GitLab in the correct environment setup that is appropriate to a new user attempting to complete the JTBD that you've selected. This environment should attempt to replicate the most realistic scenario that's appropriate for your persona in a "new user" state. This may not be a brand new/empty project.

### Heuristic Buddy (Evaluator)

1. [ ] Review the current experience, noting where you expect a user's high and low points to be based on our [UX Heuristics](https://about.gitlab.com/handbook/engineering/ux/heuristics/). Using an experience map, such as the one found in [this template](https://app.mural.co/template/6b2c082d-d81a-4a3b-9fff-37525ac9e173/dcdc71d4-1fce-4fe1-ae98-81267bd232ea), capture the screens and jot down observations.
    1. During the evaluation strive to wear the hat of the persona relevant to the JTBD and while doing so try to see the UI from their perspective as if they were a new user. 
    1. As you progress through your evaluation this will be easy to forget so it's recommended to put a reminder somewhere in your view, such as a post-it stuck on your monitor that says "You're a new user!"
1. [ ] Use the [**Grading Rubric**](https://about.gitlab.com/handbook/engineering/ux/heuristics/#scoring) to provide an overall measurement that becomes the **Benchmark score** for the experience (one grade per JTBD), and add it to this issue's description. Document the score in the [UX Scorecard Spreadsheet](https://drive.google.com/drive/u/0/search?lfhs=2&q=JTBD%20UX%20Scorecards).
1. [ ] Once testing is complete, create a walkthrough video that documents what you experienced when completing the job in GitLab. Begin the video with a contextual introduction including: 
    1. Your role, stage group
    1. Specify how you conducted the heuristic evaluation
    1. Add a short introduction describing the JTBD and the purpose of the UX scorecard (i.e. you're performing the evaluation in partnership with {stage group} and {product designer}. 
    1. This is not a "how-to" video, but instead should help build empathy for users by clearly showing areas of potential frustration and confusion. (You can point out where the experience is positive, too.) 
    1. At the end of the video, make sure to include narration of the Benchmark Score. Examples [here](https://www.youtube.com/watch?v=wCnpEGhS8uk&feature=youtu.be) and [here](https://www.youtube.com/watch?v=MkTOwTxsoL8).
   - The walkthrough video shouldn't take you long to create. Don't worry about it being polished or perfect, it's more important to be informative.
1. [ ] Post your video to the [GitLab Unfiltered YouTube](https://www.youtube.com/channel/UCMtZ0sc1HHNtGGWZFDRTh5A) channel, and link to it from this issue's description.
1. [ ] Link to your video in the [Engineering Week in Review](https://docs.google.com/document/d/1EkfzI85aqw8chYDBf2GLRvjKEa3s0FWHMI3u0DIr-xg/edit).
1. [ ] Once the evaluation has been completed ping the Stage Group Product Designer in this issue letting them know it's ready for their review.

### Group Product Designer (Expert)

1. [ ] Collaborate with your Heuristic Buddy to create recommendation issues as needed.  
1. [ ] Add a `UX scorecard-rec` label to every issue for traceability
1. [ ] Link your recommendation issues to your main UX Scorecard issue
1. Tip 1: Brainstorm opportunities to fix or improve areas of the experience.
    - Use the findings from the Emotional Grading scale to determine areas of immediate focus. For example, if parts of the experience received a “Negative” Emotional Grade, consider addressing those first.
1. Tip 2: Think iteratively, and create dependencies where appropriate, remembering that sometimes the order of what we release is just as important as what we release.
    - If you need to break recommendations into phases or over multiple milestones, create multiple epics and use the [Category Maturity Definitions](https://about.gitlab.com/direction/maturity/) in the title of each epic: **Minimal, Viable, Complete, or Lovable**.
