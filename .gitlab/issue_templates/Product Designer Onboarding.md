<!--
Some notes on setup:

The issue title should be: Product Designer Onboarding (NAME), as (ROLE, STAGE GROUP)

FIND AND REPLACE the following in this issue template before creating the issue:

NEW_TEAM_MEMBER     -> replace with handle of new team member
UX_BUDDY            -> replace with handle of the new team member's UX Buddy
UX_BUDDY_GOOGLE_DOC -> replace with url to google doc created by UX buddy for 1:1 meeting notes
PD_MANAGER          -> replace with handle of the Product Design manager
UX_TEAM             -> replace with the UX Team of the new team member
STAGE_NAME          -> replace with the new team member's stage name
STAGE_LABEL         -> replce with the lael for the new team member's stage
STAGE_VISION_URL    -> replace with the url for the new team member's stage's vision in the handbook
STAGE_FEATURE_URL   -> replace with the url for the new team member's stage's features in the handbook
STAGE_ROADMAP_URL   -> replace with the url for the new team member's stage's roadmap in the handbook
DUE_DATE            -> replace with date that is 1 month after start date

-->

/assign @NEW_TEAM_MEMBER @UX_BUDDY

/due DUE_DATE

/label ~onboarding

/confidential

# Hello :wave: 

Welcome to the UX department @NEW_TEAM_MEMBER! We are happy to have you and support you! :tada:

## How to use this onboarding issue

To get you up to speed so you can start contributing to the team efforts and improving GitLab as a product, this onboarding issue will try to provide a few tips on how to navigate the team resources as well as company resources.

### Take your time

Taking in a lot of information can quickly feel overwhelming. This is normal and you are encouraged to ask questions at any time. Embrace knowing nothing and learning as you go.

Take your time to work through your onboarding tasks, you are not expected to be at 100% productivity right away! And remember: if you are here, it's because you are the best person we have found in the world (literally) to do this job :smile:.

### Collaborate with others

If you have questions, don't hesitate to mention @UX_BUDDY (your UX buddy), @PD_MANAGER (your Product Design Manager), @UX_TEAM (your UX team), or the whole UX department by using `@gitlab\-com/gitlab\-ux` (use the latter sparingly unless it's something important). You can also reach out to team members in the [`#ux` Slack channel](https://gitlab.slack.com/messages/C03MSG8B7/).

You'll have a weekly 1:1 call with your UX buddy until your onboarding is complete. A good time to schedule these is towards the end of the week so you can talk through questions and set expectations for the next week. Your onboarding doesn't have a scheduled end date, just focus on learning and getting comfortable with GitLab and the UX department.

### Remember to practice self-care

Make sure you take breaks if you feel overwhelmed or tired, especially if this is your first remote job. Remember to stretch your legs, drink some water, and disconnect when necessary. Try to establish a healthy routine that will empower you to work in a way that enables you to deliver the best results.

If you need inspiration on how to set up a routine that will empower you doing your best work, discover [how other GitLab team members structure their workday](https://gitlab.com/gl-retrospectives/configure/issues/17).


## UX Department :raised\_hands:

To start off with, let's learn about and connect with the UX team here at GitLab.

- [ ] Read through the whole [UX handbook](https://about.gitlab.com/handbook/product/ux/) section, please!
   - Consider this your first team task, understanding how we work. If you find any typos or items that could be made clearer, please consider [editing that page](https://gitlab.com/-/ide/project/gitlab-com/www-gitlab-com/edit/master/-/sites/handbook/source/handbook/product/ux/index.html.md.erb) by submitting a merge request!
   - Note that this will take a while! Don't try to do it all at once.
- [ ] Join the `#random-coffees-ux-dept` Slack channel to automatically be paired with someone else from the UX department for a [coffee chat](https://about.gitlab.com/company/culture/all-remote/#coffee-chats). 
    - Pairings occur once every two weeks. 
    - Coffee chats help get to know others you work with and talk about everyday things. We want you to make friends and build relationships with the people you work with to create a more comfortable, well-rounded environment. 
- [ ] Add the [UX Calendar](https://calendar.google.com/calendar/u/0/embed?src=gitlab.com_9psh26fha3e4mvhlrefusb619k@group.calendar.google.com) so you can see when we meet synchronously. 
- [ ] Once you have access to it, sync [Time Off by Deel](https://about.gitlab.com/handbook/paid-time-off/#time-off-by-deel) (the PTO Slack app) with the UX Calendar by following these steps:
    1. In Google Calendar, click on the gear icon in the upper right corner to navigate to Settings.
    1. Click on the calendar you want to sync with, and scroll down to find the Calendar ID.
    1. Within Slack, navigate to the Time Off by Deel application.
    1. On the home tab, click the dropdown and select Calendar sync.
    1. Under Additional calendars to include? click on Add calendar.
    1. In the modal, paste the Calendar ID you copied from Google Calendar and hit Submit.
    1. Your PTO dates should now automatically sync with that calendar.
- [ ] Read the [Product Design workflow](https://about.gitlab.com/handbook/product/ux/product-design/#product-design-workflow) which is important to get to know
- [ ] Read the [design project and documentation](https://gitlab.com/gitlab-org/gitlab-design/blob/master/README.md)
- [ ] Become familiar with [Pajamas](https://handbook.gitlab.com/handbook/product/ux/pajamas-design-system/), which is our design system where we document all product design decisions and things to help us make those decisions. Parts of the design system can be accessed through different platforms, with the aim to consolidate these further.
   - [ ] [design.gitlab.com](https://design.gitlab.com) includes foundational design decisions and guidelines, component documentation and examples, and product design decisions and tools.
   - [ ] [gitLab-ui](https://gitlab.com/gitlab-org/gitlab-ui) includes deeper information about component development and implementation, including a hosted [storybook](https://gitlab-org.gitlab.io/gitlab-ui/) instance.
   - [ ] [gitlab-svgs](https://gitlab.com/gitlab-org/gitlab-svgs) includes our SVG Assets and the corresponding pipelines to create all of our SVG sprites for our icons, these can also be browsed using the [GitLab SVG Previewer](http://gitlab-org.gitlab.io/gitlab-svgs/).
   - [ ] [Pajamas UI Kit](https://www.figma.com/files/project/3802635) includes Figma assets and styles for creating static design mocks. Updates match the company milestone cadence and are documented in the [release notes](https://design.gitlab.com/get-started/uik-release-notes). 
- [ ] Around your third week, check in with you UX buddy about shadowing them for their daily UX activities. This is a good primer and a way to get more familiar with product designer workflows. You will serve as a second opinion and be included in meetings.

## Staying informed :mega:

- [ ] Consider joining these Slack channels to stay on top of the most important things
    -  UX Department
        - [ ] [`#ux`](https://gitlab.slack.com/messages/C03MSG8B7)
        - [ ] [`#ux-coworking`](https://gitlab.slack.com/messages/CLW71KM96)
        - [ ] [`#ux-research`](https://gitlab.slack.com/messages/CMEERUCE4)
        - [ ] [`#design-system`](https://gitlab.slack.com/messages/CDNNDD1T3)
        - [ ] [`#ux-bookclub`](https://gitlab.slack.com/messages/CRCQ1RYUU)
        - [ ] [`#ux-social`](https://gitlab.slack.com/messages/C01SDUDAGDR)
        - [ ] [`#ux-community-contributions`](https://gitlab.slack.com/messages/C01QPJGU14P)
        - [ ] [`#figma`](https://gitlab.slack.com/archives/CNDGX396C)
        - [ ] Ask your UX Buddy and/or manager about UX slack channels for your stage
    - If you haven't already, consider joining these company-wide channels:
        - [ ] [`#whats-happening-at-gitlab`](https://gitlab.slack.com/messages/C0259241C)
        - [ ] [`#company-fyi`](https://gitlab.slack.com/messages/C010XFJFTHN)
        - [ ] [`#is-this-known`](https://gitlab.slack.com/messages/CETG54GQ0)
        - [ ] [`#product`](https://gitlab.slack.com/messages/C0NFPSFA8)
        - [ ] [`#eng-week-in-review`](https://gitlab.slack.com/messages/CJWA4E9UG)
        - [ ] [`#handbook`](https://gitlab.slack.com/messages/C81PT2ALD)
- [ ] You should receive an invite to the [UX weekly](https://docs.google.com/document/d/189WZO7uTlZCznzae2gqLqFn55koNl3-pHvU-eVnvG9c/edit) meeting (every Tuesday). Please check your calendar and let your manager know if you don't see an invite.
    - Note that you are not obligated to be part of any of the meetings that you are invited to! At GitLab, everyone is a [manager of one](https://handbook.gitlab.com/handbook/leadership/#managers-of-one) responsible for deciding how best to use their own time. However, please communicate your attendance to the team by responding to invites in time.
    - Even if you are [unable to attend the sync meeting](https://about.gitlab.com/company/culture/all-remote/asynchronous/#examples-of-asynchronous-integration-on-gitlab-teams), read the agenda items and contribute asynchronously.
    - [ ] Check out the [recordings](https://drive.google.com/drive/u/0/folders/1VIki1Z3bp8KEoZFq7ABKeKLy9KhHeEgO) of a few recent meetings (and bookmark this link to access future recordings).
- [ ] Ensure that you have been invited to the [UX Showcase](https://about.gitlab.com/handbook/product/ux/ux-department-workflow/ux-showcase/) that is held every two weeks.
    - This meeting is an opportunity to learn what designers in different stage groups are working on and frequently features walkthroughs of various research findings and design solutions. It is also an opportunity for designers to learn different approaches and processes from one another, as well as identify areas for [cross-stage collaboration](https://about.gitlab.com/handbook/product/ux/how-we-work/cross-stage-design-collaboration/).
- [ ] Lastly, make sure you have access to the `GitLab Team Meetings` calendar. Every department and stage group hosts [group conversations](https://handbook.gitlab.com/handbook/group-conversations/) to keep everyone informed about their efforts. This is a great way to learn about the company and what different teams are up to. They are called conversations for a reason, meaning you are able to ask questions and join the discussion!

## Your product stage :fox:

**STAGE_NAME** has been designated your product stage, to be your focus and responsibility. Any issues related to this stage will be labeled ~"STAGE_LABEL". 

Please make sure you:

- [ ] Understand our [product hierarchy](https://about.gitlab.com/handbook/product/categories/#hierarchy)
- [ ] Get to know your [stage's teammates](https://about.gitlab.com/handbook/product/categories/#devops-stages)
- [ ] Read its [vision](STAGE_VISION_URL)
- [ ] See where it stands in terms of [category maturity](https://about.gitlab.com/direction/maturity/)
- [ ] Explore its [features](STAGE_FEATURE_URL) and [roadmap](STAGE_ROADMAP_URL) 
- [ ] Watch product demos and more on [GitLab Learn](https://about.gitlab.com/learn/) 
- [ ] Start collaborating with your assigned UX Buddy. You should both arrange a day to have a regular 1:1 call (at least once a week). They have prepared a [Google Doc](UX_BUDDY_GOOGLE_DOC) to guide your sessions, feel free to add discussion points to the agenda.

<!--
Below is extra inforomation to help you understand our product better. Feel free to remove or revise.
-->

## Understand GitLab users - how people use our product :pencil2:

- [ ] Read about user [personas](https://about.gitlab.com/handbook/product/personas/)
- [ ] UX Scorecards: [what are they?](https://about.gitlab.com/handbook/product/ux/ux-scorecards/), [epic link](https://gitlab.com/groups/gitlab-org/-/epics?scope=all&utf8=%E2%9C%93&state=opened&label_name[]=UX%20scorecard)
- [ ] UX Research Shadowing: Prior to performing UX research on your own, you should participate in research shadowing. You can kick off the process when you meet with the [UX Researcher for your group](https://about.gitlab.com/handbook/product/categories/#devops-stages) and learn more about the [UX Research shadowing process](https://about.gitlab.com/handbook/product/ux/ux-research/research-shadowing/). 

## Tech knowledge to know :computer:

As a designer at GitLab, you will come into contact with a lot of complex, technical concepts. If you already want to dive deeper into some of these, you can have a look at the following videos.

- [ ] What is DevOps: [video](https://youtu.be/_Gpe1Zn-1fE)
- [ ] What is DevSecOps: [article](https://about.gitlab.com/topics/devsecops/)
- [ ] What is CI/CD (Continuous Intergation/Continuous Delivery [or Deployment]): [video](https://www.youtube.com/watch?v=AlrImm1T8Wg)
- [ ] What is YAML: [video](https://www.youtube.com/watch?v=o9pT9cWzbnI)
- [ ] What is Value Stream Management: [direction page](https://about.gitlab.com/solutions/value-stream-management/)

### Optional deep dives

- [ ] What is Docker: [video](https://www.youtube.com/watch?v=zJ6WbK9zFpI)
- [ ] What is Kubernetes: [video](https://www.youtube.com/watch?v=2vMEQ5zs1kov)
- [ ] What is AWS EKS/ECS/Fargate: [video](https://www.youtube.com/watch?v=UT88Ojx-TLk)
- [ ] What is the differences between Countinous Delivery VS Countinous Deployment: [video](https://www.youtube.com/watch?v=93raARQl8PE)
- [ ] What is Helm: [video](https://www.youtube.com/watch?v=9cwjtN3gkD4)

## Access requests :guardsman:

You'll need access to various tools to do your job. Your manager may have already created access requests for some of these, but be sure that you gain access to the following. 

_Note: you can bundle your requests into one [access request issue](https://about.gitlab.com/handbook/business-technology/end-user-services/onboarding-access-requests/access-requests/#individual-or-bulk-access-request)_.

### UX research

- [ ] Open a [access request issue](https://about.gitlab.com/handbook/business-technology/end-user-services/onboarding-access-requests/access-requests/#individual-or-bulk-access-request) for the following UX research systems:
    - [ ] `Dovetail` for UX research insights
    - [ ] `Respondent.io` for UX research recruitment
    - [ ] `Qualtrics` for for future research engagements


### Cloud provider access requests

Discuss with your assigned group if access to these cloud providers is necessary to perform your work. If so, request access to the following:

- [ ] GCP projects
- [ ] AWS


## Awesome flows :runner:

As part of your onboarding and to be best prepared for future responsibilities, it is recommended to walk through a few flows inside of the product, ask any questions you have (for example in this issue), and also document your steps as you go in a journal. This will give you a chance to reflect back on your onboarding and address/pinpoint issues that may have come up with a new sense of understanding.

Aside from adjusting towards the async workflow of GitLab please try to see if you can complete the following flows:

- [ ] [Create a project and launch a simple website on GitLab pages](https://docs.gitlab.com/ee/user/project/pages/getting_started/pages_new_project_template.html).
- [ ] Suggest a change and open a merge request for any project.
- [ ] See how you receive notifications on issues. You get both emails as well as todos. (It's up to you to decide which one to use — this is a good conversation to have with your UX buddy).
- [ ] Once you have access to the GitLab organization in Figma, browse some of the teams and projects to see how we design in Figma. Check out the [GitLab Figma plugin](https://www.figma.com/community/plugin/860845891704482356) to upload designs directly from Figma to GitLab issues.
- [ ] The [GitLab Development Kit (GDK)](https://gitlab.com/gitlab-org/gitlab-development-kit) allows you to install GitLab's development environment on your computer. This will enable you to test certain features that aren't available in production. It is highly recommended that you install the GDK and try checking out a branch to see how it looks running locally. Your UX buddy can help you with this and the `#gdk` Slack channel is there for you if you need help.
    - [ ] If you are not used to maintaining a local development environment like the one mentioned above, you can also use the GDK in [Gitpod](https://gitpod.io). This allows you to make/review changes exclusively in the browser. If you prefer this, read the [instructions on how to use the Gitpod GDK](https://gitlab.com/gitlab-org/gitlab-development-kit/-/blob/main/doc/howto/gitpod.md) and watch this video that walks you through [how to review merge requests both locally as well as in Gitpod](https://www.youtube.com/watch?v=M7b19Dq-1tw&t=12s). The `#gitpod-gdk` Slack channel is here for you if you need help or have any feedback.
    - [ ] Discuss with your group if you need a tier license for your GDK install.  If so, follow the steps in [Working in Gitlab EE](https://about.gitlab.com/handbook/developer-onboarding/#working-on-gitlab-ee-developer-licenses) to request a license.
- [ ] Create your first [UX Scorecard](https://about.gitlab.com/handbook/product/ux/ux-scorecards/) documenting the current experience of a common job. Make sure to discuss this with your UX buddy beforehand. They can give you ideas and point to particular product areas that haven't been evaluated yet.
- [ ] Collaborate with your UX buddy and make a change to this [onboarding template](https://gitlab.com/gitlab-org/gitlab-design/-/blob/master/.gitlab/issue_templates/UX%20Onboarding.md) to improve the onboarding experience for future GitLab team members.

<!--

Feel free to add specific product stage flows, if necessary.

-->

## GitLab Product: Benefits and Demos :tv:

Optional: If you'd like to learn more about the product outside your stage, the Sales org has created a series of excellent overviews around who uses GitLab and how they benefit from it. Learning about the product from the perspective of benefits will help you understand JTBD too. Feel free to bookmark these and dive deeper after you feel more comfortable.

- [ ] Introduction to GitLab: [video](https://www.youtube.com/watch?v=oGedmbCBCp4)
- [ ] Learn about competitors: [video](https://www.youtube.com/watch?v=B5xhw5pPWlk)
- [ ] Create and Plan stages: [video](https://www.youtube.com/watch?v=C0yrlj9_6Z8)
- [ ] Verify and Security stages: [video](https://www.youtube.com/watch?v=YXCu71UwurI)
- [ ] Package, Configure and Release stages: [video](https://www.youtube.com/watch?v=fU9ljmeniBY)
- [ ] Manage, Monitor and Protect stages: [video](https://www.youtube.com/watch?v=wmdei63TCVM)
- [ ] GitLab Workshop 1 (basic demo of GitLab): [video](https://www.youtube.com/watch?v=5mTwIoSS0UU)
- [ ] GitLab Workshop 2 (more advanced demo of GitLab): [video](https://www.youtube.com/watch?v=sly0Xe5912g)

<!--

Feel free to add more info and links that may help your new teammate
better understand the product stage, if necessary.

-->

## Feedback on your onboarding experience :open\_hands: 

This issue is [confidential](https://docs.gitlab.com/ee/user/project/issues/confidential_issues.html#permissions-and-access-to-confidential-issues) and visible only to the GitLab team by default, meaning this is a safe space to ask any questions and to describe any experiences you might have had. It's a tool to help **you** succeed, not others or something else!

If you have some new-found knowledge to share, the rest of the UX department would love to hear your experiences! You are in a position to help make things better for everyone (colleagues, new teammates, users, customers, etc.), including you.

- [ ] Start discussions in this issue, one for each specific topic you want to share. These can be about the work itself, the product, the company, the team, or even about your personal side of it all (free time, health, relationships, etc.) To help you with this, here are some _suggestive and optional_ questions:
   - What were the big ideas you came across? The biggest learnings?
   - What were the big surprises?
   - What were the big questions?
   - What went well?
   - What did not go well?
   - What could be better?
- [ ] Some topics will be questions, others statements, and others will be an opportunity to improve. Try to think about what could be improved and, if possible, how. In the end, each possible improvement should either:
   - start a separate issue for a broader discussion,
   - or start a merge request to change something, anything!
- [ ] How can we improve the Product Designer onboarding experience? Please keep notes on what went well, what did not go well, or could be improved. With that information, we'll iteratively improve our onboarding experience.
- [ ] Before closing this issue, please add yourself to the next [UX weekly meeting agenda](https://docs.google.com/document/d/1Y_t6Oq4vqwA2eHPaXx0H6HkZiZ4um_lWHsqJIDstnEE/edit?usp=sharing) and spend 3-5 minutes max in total sharing a summary of your experience with the team.

## Tips and tricks :info:

## Tips and tricks :information_source:
- When opening an issue use:
    - The [GitLab design project](https://gitlab.com/gitlab-org/gitlab-design/issues/new) to start a discussion on design-related matters.
    - The [Pajamas repository](https://gitlab.com/gitlab-org/gitlab-services/design.gitlab.com/-/issues/new) to propose new component designs or existing component updates.
    - The [GitLab issue tracker](https://gitlab.com/gitlab-org/gitlab/-/issues/new) to find existing and propose new product-related features.
- In Figma:
    - Click the ⭑ button to add a project to your favorites for easy access (for example, your stage group project).
    - All users in the organization already have access to the Pajamas library and GitLab fonts so don't worry about configuring or installing locally. 
    - To keep files organized within a project, consider [setting the thumbnail](https://help.figma.com/hc/en-us/articles/360038511413-Set-custom-thumbnails-for-files#:~:text=Right%2Dclick%20on%20the%20frame%20in%20the%20FigJam%20board.,as%20thumbnail%20from%20the%20options.) to the Pajamas [cover template](https://www.figma.com/file/J7pUGJjhpcS5na8vckEjLa/Cover?type=design&node-id=0%3A1&mode=design&t=cy0SMOhdQKwpkcUt-1).
- Pajamas is comprised of the following:
    - [design.gitlab.com](https://design.gitlab.com/)
    - [Gitlab UI](https://gitlab-org.gitlab.io/gitlab-ui/) (an isolated playground used for previewing live components via props)
    - [UI Kit (Figma)](https://www.figma.com/files/972612628770206748/project/3802635)
- Other useful resources:
    - [Brand illustration and iconography](https://www.figma.com/files/972612628770206748/project/53327133)
    - [Workflow templates](https://www.figma.com/files/972612628770206748/project/5846042)
    - [Design resources](https://www.figma.com/files/972612628770206748/project/4507772)
- If you're editing a markdown file with [GitLab's Web IDE](https://docs.gitlab.com/ee/user/project/web_ide/) (a VS Code fork), you can quickly preview the result with the `⇧⌘V` [shortcut](https://code.visualstudio.com/docs/languages/markdown#:~:text=Markdown%20preview,-VS%20Code%20supports&text=To%20switch%20between%20views%2C%20press,real%2Dtime%20as%20you%20edit.).
- Working remotely comes with great power and great responsibility. [Here are a few tips on being efficient and productive](https://about.gitlab.com/2018/05/17/eliminating-distractions-and-getting-things-done/).

---

The below sections are setup tasks to be completed by your UX Buddy and your manager. Finally, some checkboxes that aren't for you!

## UX Buddy tasks

- [ ] Invite the new team member to the product stage Slack channel.
- [ ] Invite the new team member to a 1:1 on their second week and set the meeting to repeat once a week.
- [ ] Create a Google Doc for 1:1 agenda items ([template](https://docs.google.com/document/d/1sg4EtHBGTugxu-u2NSoH9LfE4zXT1ru1-Z3EiIXlohY)), share it with the new team member, attach it to the 1:1 event, and update the link in the [Your product stage](#your-product-stage-fox) section of this issue by finding and replacing `UX_BUDDY_GOOGLE_DOC` in this issue description.
- [ ] Create a [custom Slack emoji](https://gitlab.slack.com/customize/emoji) for the new team member using their profile image and upload it to Slack with the new team member's GitLab handle (for example `:johndoe:`). You can use [makeemoji.com](https://makeemoji.com/) to help you create the emoji with the correct image dimensions. (optional)
- [ ] Invite the new team member to shadow you during their third week to help familiarize them with the team and workflow.

## Product Design Manager tasks

- [ ] Add the new team member to the product stage daily stand-up bot (your team uses this to post daily updates including what you are working on and if you have any blockers, much like a regular stand-up but much easier than doing one in real life).
- [ ] Add the new team member to the product stage [async retrospective](https://gitlab.com/gitlab-org/async-retrospectives).
- [ ] Add the new team member to the product stage weekly and monthly meetings.
