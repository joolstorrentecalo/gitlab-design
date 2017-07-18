# Import file "sidebar_prototype_horizontal_breadcrumbs 2"
sketch = Framer.Importer.load("imported/sidebar_prototype_horizontal_breadcrumbs 2@1x")
# Import file "sidebar_prototype"
# sketch = Framer.Importer.load("imported/sidebar_prototype@1x")
{Environment} = require "Environment"
{EnvironmentController} = require "EnvironmentController"
{Sidebar} = require "Sidebar"
{BreadcrumbNavigationController} = require "BreadcrumbNavigationController"
{BreadcrumbNavigationSection} = require "BreadcrumbNavigationSection"
{BreadcrumbNavigationSectionContent} = require "BreadcrumbNavigationSectionContent"
{BreadcrumbNavigationRow} = require "BreadcrumbNavigationRow"
{ContextualNavigationController} =require "ContextualNavigationController"
{ContextualNavigationFirstLevelSection} = require "ContextualNavigationFirstLevelSection"
{ContextualNavigationFirstLevelRow} = require "ContextualNavigationFirstLevelRow"
{ContextualNavigationSecondLevelSection} = require "ContextualNavigationSecondLevelSection"
{ContextualNavigationSecondLevelRow} = require "ContextualNavigationSecondLevelRow"
{ContextualNavigationDropdown} = require "ContextualNavigationDropdown"
{ContextualNavigationDropdownRow} = require "ContextualNavigationDropdownRow"
{ContentArea} = require "ContentArea"
{ContentAreaContainer} = require "ContentAreaContainer"
{Row} = require "Row"

# Set Framer parameters
Framer.Extras.ShareInfo.disable()
Framer.Extras.Hints.disable()
Framer.Extras.Preloader.setLogo("images/logo.png")
Framer.Device.background.backgroundColor = "white"

# Define and set custom device
device_width = 1520
device_height = 800

Framer.Device.customize
	screenWidth: device_width
	screenHeight: device_height
	deviceType: "fullScreen"
	backgroundColor: "white"
	
# Use desktop cursor
document.body.style.cursor = "auto"

gitlab_tree = [
	{
		'name' : 'group',
		'breadcrumbs' : [
			{
				'name' : 'group_section',
				'text' : 'GROUP',
				'rows' : [
					{
						'name' : 'customers_group', 'text' : 'customers',
						'image' : 'images/group-customers.png' 
						'environment_link' : 'group'
					}
				]
			}
		],
		'contextual' : [
			{ 
				'first_level_row': {
					'name' : 'group', 'text' : 'Group', 
					'pages' : [
						{
							'image' : 'images/group-group-home.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 135,
									'y' : 271,
									'width' : 125,
									'height' : 56,
									'link' : {
										'environment' : 'group',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 1
									}
								}
							] 
						},
						{
							'image' : 'images/group-group-home--subgroups.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 273,
									'width' : 114,
									'height' : 53,
									'link' : {
										'environment' : 'group',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}, {
									'x' : 16,
									'y' : 328,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'subgroup',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							] 
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'group_home', 'text' : 'Home', 
						'pages' : [
							{
								'image' : 'images/group-group-home.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 135,
										'y' : 271,
										'width' : 125,
										'height' : 56,
										'link' : {
											'environment' : 'group',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 1
										}
									}								
								] 
							}, {
								'image' : 'images/group-group-home--subgroups.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 273,
										'width' : 114,
										'height' : 53,
										'link' : {
											'environment' : 'group',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}, {
										'x' : 16,
										'y' : 328,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'subgroup',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								]
							}
						]
					}, {
						'name' : 'group_activity', 'text' : 'Activity', 
						'pages' : [
							{
								'image' : 'images/group-group-activity.png',
								'height' : 1356,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environmnt' : 'group',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}
				]
			}, {
				'first_level_row': {
					'name' : 'issues', 'text' : 'Issues', 
					'pages' : [
						{
							'image' : 'images/group-issues-list.png',
							'height' : 1439,
							'hotspots': [
								{
									'x' : 16,
									'y' : 178,
									'width' : 1248,
									'height' : 1225,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 2,
										'second_level_row_index' : 0,
										'page_index' : 1
									}
								}
							] 
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'issues_list', 'text' : 'List', 
						'pages' : [
							{
								'image' : 'images/group-issues-list.png',
								'height' : 1439,
								'hotspots': [
									{
										'x' : 16,
										'y' : 178,
										'width' : 1248,
										'height' : 1225,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 1
										}
									}
								] 
							}
						]
					}, {
						'name' : 'issues_labels', 'text' : 'Labels', 
						'pages' : [
							{
								'image' : 'images/group-issues-labels.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environment' : 'group',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}, {
						'name' : 'issues_milestones', 'text' : 'Milestones', 
						'pages' : [
							{
								'image' : 'images/group-issues-milestones.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environment' : 'group',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}	
								] 
							}
						]
					}
				]
			}, {
				'first_level_row': {
					'name' : 'merge_requests', 'text' : 'Merge Requests', 
					'pages' : [
						{
							'image' : 'images/group-merge_requests.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 178,
									'width' : 1248,
									'height' : 373,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 3,
										'second_level_row_index' : null,
										'page_index' : 1
									}
								}
							]
						}
					]
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'members', 'text' : 'Members',
					'pages': [
						{
							'image' : 'images/group-members.png',
							'height' : 749,
							'hotspots': []
						}
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'settings', 'text' : 'Settings', 
					'pages' : [
						{
							'image' : 'images/group-settings.png',
							'height' : 1318,
							'hotspots': []
						}
					]
				},
				'second_level_rows': []
			}
		]
	},
	{
		'name' : 'subgroup',
		'breadcrumbs' : [
			{
				'name' : 'groups_section',
				'text' : 'GROUPS',
				'rows' : [
					{
						'name' : 'customers_group', 'text' : 'customers',
						'image' : 'images/group-customers.png' 
						'environment_link' : 'group'
					}, {
						'name' : 'subgroup', 'text' : 'organisation',
						'image' : 'images/subgroup-organization.png' 
						'environment_link' : 'subgroup'
					}
				]
			}
		],
		'contextual' : [
			{ 
				'first_level_row': {
					'name' : 'group', 'text' : 'Group', 
					'pages' : [
						{
							'image' : 'images/subgroup-group-home.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 328,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							]
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'group_home', 'text' : 'Home', 
						'pages' : [
							{
								'image' : 'images/subgroup-group-home.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 328,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								]
							}
						]
					}, {
						'name' : 'group_activity', 'text' : 'Activity', 
						'pages' : []
					}
				]
			}, { 
				'first_level_row': {
					'name' : 'issues', 'text' : 'Issues', 
					'pages' : []
				},
				'second_level_rows': [
					{
						'name' : 'issues_list', 'text' : 'List', 
						'pages' : []
					}, {
						'name' : 'issues_labels', 'text' : 'Labels', 
						'pages' : []
					}, {
						'name' : 'issues_milestones', 'text' : 'Milestones', 
						'pages' : []
					}
				]
			}, {
				'first_level_row': {
					'name' : 'merge_requests', 'text' : 'Merge Requests', 
					'pages' : []
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'members', 'text' : 'Members',
					'pages' : []
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'settings', 'text' : 'Settings', 
					'pages' : []
				},
				'second_level_rows': [
					{
						'name' : 'settings_general', 'text' : 'General', 
						'pages' : []
					}, {
						'name' : 'settings_projects', 'text' : 'Projects', 
						'pages' : []
					}
				]
			}
		]
	},
	{
		'name' : 'project'
		'breadcrumbs' : [
			{
				'name' : 'groups_section',
				'text' : 'GROUPS',
				'rows' : [
					{
						'name' : 'customers_group', 'text' : 'customers',
						'image' : 'images/group-customers.png' 
						'environment_link' : 'group'
					}, {
						'name' : 'subgroup', 'text' : 'organisation', 
						'image' : 'images/subgroup-organization.png' 
						'environment_link' : 'subgroup'
					}
				]
			},
			{
				'name' : 'project_section'
				'text' : 'PROJECT',
				'rows' : [
					{
						'name' : 'project-stack_story', 'text' : 'stack-story',
						'image' : 'images/project-stack-story.png'
						'environment_link' : 'project'
					} 
				]
			},
		],
		'contextual' : [
			{ 
				'first_level_row': {
					'name' : 'project', 'text' : 'Project', 
					'pages' : [
						{
							'image' : 'images/project-project-home.png' 
							'height' : 916,
							'hotspots': [] 
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'project_home', 'text' : 'Home', 
						'pages' : [
							{
								'image' : 'images/project-project-home.png',
								'height' : 916,
								'hotspots': [] 
							}
						]
					}, {
						'name' : 'project_activity', 'text' : 'Activity',
						'pages' : [
							{ 
								'image' : 'images/project-project-activity.png',
								'height' : 1422,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 59,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}, {
						'name' : 'project_cycle_analytics', 'text' : 'Cycle Analytics', 
						'pages' : [
							{
								'image' : 'images/project-project-cycle_analytics.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 59,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}
				]
			}, {
				'first_level_row': {
					'name' : 'repository', 'text' : 'Repository', 
					'pages' : [
						{
							'image' : 'images/project-repository.png',
							'height' : 822,
							'hotspots': [] 
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'repository_files', 'text' : 'Files', 
						'pages' : [
							{
								'image' : 'images/project-repository.png',
								'height' : 822,
								'hotspots': [] 						
							}
						]
					}, {
						'name' : 'repository_commits', 'text' : 'Commits', 
						'pages': [
							{
								'image' : 'images/project-repository-commits.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 87,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 1,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 						
							}
						] 
					}, {
						'name' : 'repository_branches', 'text' : 'Branches', 
						'pages': [] 
					}, {
						'name' : 'repository_tags', 'text' : 'Tags', 
						'pages': [] 
					}, {
						'name' : 'repository_contributors', 'text' : 'Contributors', 
						'pages': [] 
					}, {
						'name' : 'repository_graph', 'text' : 'Graph', 
						'pages': [] 
					}, {
						'name' : 'repository_compare', 'text' : 'Compare', 
						'pages': [] 
					}, {
						'name' : 'repository_charts', 'text' : 'Charts', 
						'pages': [] 
					}, {
						'name' : 'repository_locked_files', 'text' : 'Locked Files', 
						'pages': [] 
					}
				]
			}, {
				'first_level_row': {
					'name' : 'issues', 'text' : 'Issues', 
					'pages' : [
						{
							'image' : 'images/project-issues-list.png',
							'height' : 1118,
							'hotspots': [					
								{
									'x' : 16,
									'y' : 125,
									'width' : 1248,
									'height' : 964,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 2,
										'second_level_row_index' : 0,
										'page_index' : 1
									}
								}
							] 
						}, {
							'image' : 'images/project-issues-detail.png',
							'height' : 1552,
							'hotspots': [
								{
									'x' : 16,
									'y' : 0,
									'width' : 51,
									'height' : 56,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 2,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							] 
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'issue_list', 'text' : 'List', 
						'pages' : [
							{
								'image' : 'images/project-issues-list.png',
								'height' : 1118,
								'hotspots': [
									{
										'x' : 16,
										'y' : 125,
										'width' : 1248,
										'height' : 964,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 1
										}
									}
								] 
							}, {
								'image' : 'images/project-issues-detail.png',
								'height' : 1552,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}, {
						'name' : 'issue_boards', 'text' : 'Boards',
						'pages' : [
							{
								'image' : 'images/project-issues-board.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 26,
										'y' : 190,
										'width' : 1170,
										'height' : 486,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 1
										}
									}, {
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}, {
						'name' : 'issue_labels', 'text' : 'Labels', 
						'pages' : [
							{
								'image' : 'images/project-issues-labels.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}, {
						'name' : 'issue_milestones', 'text' : 'Milestones', 
						'pages' : [
							{
								'image' : 'images/project-issues-milestones.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 51,
										'height' : 56,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}
				]
			}, {
				'first_level_row': {
					'name' : 'merge_requests', 'text' : 'Merge Requests', 
					'pages' : [
						{
							'image' : 'images/project-merge_requests.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 125,
									'width' : 1248,
									'height' : 326,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 3,
										'second_level_row_index' : null,
										'page_index' : 1
									}
								}
							] 
						}, {
							'image' : 'images/project-merge_requests-detail.png',
							'height' : 805,
							'hotspots': [
								{
									'x' : 16,
									'y' : 0,
									'width' : 127,
									'height' : 56,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 3,
										'second_level_row_index' : null,
										'page_index' : 0
									}
								}
							] 
						}
					]
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'pipelines', 'text' : 'Pipelines', 
					'pages' : [
						{
							'image' : 'images/project-pipelines.png',
							'height' : 749,
							'hotspots': [] 
						}
					]
				},
				'second_level_rows': [
					{
						'name' : 'pipelines_pipelines', 'text' : 'Pipelines', 
						'pages' : [
							{
								'image' : 'images/project-pipelines.png',
								'height' : 749,
								'hotspots': [] 
							}
						]
					}, {
						'name' : 'pipelines_jobs', 'text' : 'Jobs', 
						'pages' : []
					}, {
						'name' : 'pipelines_charts', 'text' : 'Charts', 
						'pages' : []
					}
				]
			}, {
				'first_level_row': {
					'name' : 'wiki', 'text' : 'Wiki', 
					'pages' : [
						{
							'image' : 'images/project-wiki.png',
							'height' : 749,
							'hotspots': [] 
						}
					]
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'settings', 'text' : 'Settings', 
					'pages' : [
						{
							'image' : 'images/project-settings.png',
							'height' : 2645,
							'hotspots': [] 
						}
					]
				},
				'second_level_rows': []
			}
		]
	},
	{
		'name' : 'global'
		'breadcrumbs' : [
			{
				'name' : 'global_section',
				'text' : 'BROWSE GITLAB',
				'rows' : []
			}
		],
		'contextual' : [
			{ 
				'first_level_row': {
					'name' : 'projects', 'text' : 'Projects', 
					'pages' : [ 
						{ 
							'image' : 'images/global-projects-your_projects--all.png',
							'height' : 850,
							'hotspots': [
								{
									'x' : 16,
									'y' : 114,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							] 
						} 
					] 
				},
				'second_level_rows': [
					{
						'name' : 'project_your_projects', 'text' : 'Your Projects', 
						'pages' : [
							{
								'image' : 'images/global-projects-your_projects--all.png',
								'height' : 850,
								'hotspots': [
									{
										'x' : 16,
										'y' : 114,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'project',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								]
							}
						]
					}, {
						'name' : 'projects_starred_projects', 'text' : 'Starred Projects', 
						'pages' : [
							{
								'image' : 'images/global-projects-starred_projects.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 65,
										'height' : 56,
										'link' : {
											'environment' : 'global',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}, {
						'name' : 'projects_explore_projects', 'text' : 'Explore Projects', 
						'pages' : [
							{
								'image' : 'images/global-projects-explore_projects--trending.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 0,
										'width' : 65,
										'height' : 56,
										'link' : {
											'environment' : 'global',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}
								] 
							}
						]
					}
				]
			}, {
				'first_level_row': {
						'name' : 'activity', 'text' : 'Activity', 
						'pages' : [ 
							{ 
								'image' : 'images/global-activity.png',
								'height' : 1392,
								'hotspots': [] 
							} 
						] 
				},
				'second_level_rows': [
					{
						'name' : 'activity_your_projects', 'text' : 'Your Projects', 
						'pages' : [
							{
								'image' : 'images/global-activity.png',
								'height' : 1392,
								'hotspots': [] 
							}
						]
					}, {
						'name' : 'activity_explore_projects', 'text' : 'Starred Projects', 
						'pages' : []
					}
				]
			}, {
				'first_level_row': {
					'name' : 'groups', 'text' : 'Groups', 
					'pages' : [ 
						{ 
							'image' : 'images/global-groups-your_groups.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 61,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'group',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}, {
									'x' : 16,
									'y' : 126,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'subgroup',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							] 
						} 
					]
				},
				'second_level_rows': [
					{
						'name' : 'groups_your_groups', 'text' : 'Your Groups', 
						'pages' : [ 
							{ 
								'image' : 'images/global-groups-your_groups.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 61,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'group',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}, {
										'x' : 16,
										'y' : 126,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'subgroup',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}, {
										'x' : 16,
										'y' : 0,
										'width' : 59,
										'height' : 56,
										'link' : {
											'environment' : 'global',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}	
								] 
							} 
						] 
					}, {
						'name' : 'groups_explore_groups', 'text' : 'Explore Groups', 
						'pages' : [ 
							{ 
								'image' : 'images/global-groups-explore_groups.png',
								'height' : 749,
								'hotspots': [
									{
										'x' : 16,
										'y' : 188,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'group',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}, {
										'x' : 16,
										'y' : 251,
										'width' : 1248,
										'height' : 62,
										'link' : {
											'environment' : 'subgroup',
											'first_level_section_index' : 0,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}, {
										'x' : 16,
										'y' : 0,
										'width' : 59,
										'height' : 56,
										'link' : {
											'environment' : 'global',
											'first_level_section_index' : 2,
											'second_level_row_index' : 0,
											'page_index' : 0
										}
									}	
								] 
							} 
						] 
					}
				]
			}, {
				'first_level_row': {
					'name' : 'milestones', 'text' : 'Milestones', 
					'pages' : [ 
						{ 
							'image' : 'images/global-milestones.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'snippets', 'text' : 'Snippets', 
					'pages' : [ 
						{ 
							'image' : 'images/global-snippets.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': [
					{
						'name' : 'your_snippets', 'text' : 'Your Snippets', 
						'pages' : [ 
							{ 
								'image' : 'images/global-snippets.png',
								'height' : 749,
								'hotspots': [] 
							} 
						] 
					}, {
						'name' : 'explore_snippets', 'text' : 'Explore Snippets', 
						'pages' : [] 
					}
				]
			}
		]
	},
	{
		'name' : 'profile',
		'breadcrumbs' : [
			{
				'name' : 'profile_section',
				'text' : 'PROFILE',
				'rows' : [
					{
						'name' : 'user_profile', 'text' : 'Tom Smith',
						'image' : 'images/user_picture.png' 
						'environment_link' : 'profile'
					}
				]
			}
		],
		'contextual' : [
			{ 
				'first_level_row': {
					'name' : 'activity', 'text' : 'Activity', 
					'pages' : [ 
						{ 
							'image' : 'images/profile-activity.png',
							'height' : 1758,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'groups', 'text' : 'Groups', 
					'pages' : [ 
						{ 
							'image' : 'images/profile-groups.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 60,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'group',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}, {
									'x' : 16,
									'y' : 126,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'subgroup',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'contributed_projects', 'text' : 'Contributed Projects', 
					'pages' : [ 
						{ 
							'image' : 'images/profile-contributed.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 60,
									'width' : 1248,
									'height' : 62,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 0,
										'second_level_row_index' : 0,
										'page_index' : 0
									}
								}
							] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'personal_projects', 'text' : 'Personal Projects',
					'pages' : [
						{
							'image' : 'images/profile-personal.png',
							'height' : 749,
							'hotspots': []
						}
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'snippets', 'text' : 'Snippets', 
					'pages' : [ 
						{ 
							'image' : 'images/profile-snippets.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}
		]		
	},
	{
		'name' : 'user_settings',
		'breadcrumbs' : [
			{
				'name' : 'settings_section',
				'text' : 'USER SETTINGS',
				'rows' : []
			}
		],
		'contextual' : [
			{ 
				'first_level_row': {
					'name' : 'profile', 'text' : 'Profile', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-profile.png',
							'height' : 1249,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'account', 'text' : 'Account', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-account.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'applications', 'text' : 'Applications', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-applications.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'chat', 'text' : 'Chat',
					'pages' : [
						{
							'image' : 'images/user_settings-chat.png',
							'height' : 749,
							'hotspots': []
						}
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'access_tokens', 'text' : 'Access Tokens', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-access-tokens.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'emails', 'text' : 'Emails', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-emails.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'password', 'text' : 'Password', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-password.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'ssh_keys', 'text' : 'SSH Keys', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-ssh_keys.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'preferences', 'text' : 'Preferences', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-preferences.png',
							'height' : 805,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'audit_log', 'text' : 'Audit Log', 
					'pages' : [ 
						{ 
							'image' : 'images/user_settings-audit_log.png',
							'height' : 749,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			}
		]	
	},
	{
		'name' : 'dashboard',
		'breadcrumbs' : [
			{
				'name' : 'dashboard_section',
				'text' : 'DASHBOARD',
				'rows' : []
			}
		],
		'contextual' : [
			{
				'first_level_row': {
					'name' : 'assigned_issues', 'text' : 'Assigned Issues', 
					'pages' : [
						{ 
							'image' : 'images/dashboard-assgined_issues.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 125,
									'width' : 1248,
									'height' : 456,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 2,
										'second_level_row_index' : null,
										'page_index' : 1
									}
								}
							] 
						} 
					] 
				},
				'second_level_rows': []
			}, {
				'first_level_row': {
					'name' : 'assigned_merge_requests', 'text' : 'Assigned Merge Requests', 
					'pages' : [ 
						{ 
							'image' : 'images/dashboard-assigned_merge_requests.png',
							'height' : 749,
							'hotspots': [
								{
									'x' : 16,
									'y' : 125,
									'width' : 1248,
									'height' : 250,
									'link' : {
										'environment' : 'project',
										'first_level_section_index' : 3,
										'second_level_row_index' : null,
										'page_index' : 1
									}
								}
							] 
						} 
					] 
				},
				'second_level_rows': []
			}, { 
				'first_level_row': {
					'name' : 'todos', 'text' : 'Todos', 
					'pages' : [ 
						{ 
							'image' : 'images/dashboard-todos.png',
							'height' : 842,
							'hotspots': [] 
						} 
					] 
				},
				'second_level_rows': []
			} 
		]
	}
]

top_bar_hotspots = [
	{
		'x' : 16,
		'y' : 8,
		'width' : 1248,
		'height' : 62,
		'link' : {
			'environment' : 'project',
			'first_level_section_index' : 2,
			'second_level_row_index' : null,
			'page_index' : 1
		}
	}
]

initial_state = {
	'environment' : 'project',
	'first_level_section_index' : 2,
	'second_level_row_index' : 0,
	'page_index' : 1
}

# Add Global Hotspots
addGlobalHotspots = (environmentController) ->
	sketch.top_bar.onClick =>
		hideAllDropdowns()
	
	sketch.hotspot_tanuki.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 0, 0, 0)
		
	sketch.hotspot_breadcrumbs_group.onClick =>
# 		hideAllDropdowns()
		environmentController.switchToEnvironment('group', 0, 0, 0)
	
	# Group breadcrumbs
	sketch.hotspot_breadcrumbs_group.onClick =>
		environmentController.switchToEnvironment('group', 0, 0, 0)
		
	# Subgroup breadcrumbs
	sketch.hotspot_breadcrumbs_subgroup_group.onClick =>
		environmentController.switchToEnvironment('group', 0, 0, 0)
	
	sketch.hotspot_breadcrumbs_subgroup_subgroup.onClick =>
		environmentController.switchToEnvironment('subgroup', 0, 0, 0)
	
	# Project breadcrumbs
	sketch.hotspot_breadcrumbs_project_group.onClick =>
		environmentController.switchToEnvironment('group', 0, 0, 0)
		
	sketch.hotspot_breadcrumbs_project_subgroup.onClick =>
		environmentController.switchToEnvironment('subgroup', 0, 0, 0)
		
	sketch.hotspot_breadcrumbs_project_project.onClick =>
		environmentController.switchToEnvironment('project', 0, 0, 0)
		
	# Global breadcrumbs
	sketch.hotspot_breadcrumbs_global.onClick =>
		environmentController.switchToEnvironment('global', 0, 0, 0)

	# Dashboard breadcrumbs
	sketch.hotspot_breadcrumbs_dashboard.onClick =>
		environmentController.switchToEnvironment('dashboard', 0, 0, 0)
		
	# User profile breadcrumbs
	sketch.hotspot_breadcrumbs_user_profile.onClick =>
		environmentController.switchToEnvironment('profile', 0, 0, 0)
		
	# Settings breadcrumbs
	sketch.hotspot_breadcrumbs_user_profile.onClick =>
		environmentController.switchToEnvironment('user_settings', 0, 0, 0)
		
		
	# Global breadcrumbs
	sketch.hotspot_breadcrumbs_
	
	sketch.hotspot_plus_button.onClick =>
		hideAllDropdowns()
		if environmentController.getCurrentEnvironment().getName() == 'project'
			sketch.dropdown_add_button_project.visible = true
		else
			sketch.dropdown_add_button_global.visible = true
	
	sketch.hotspot_projects.onClick =>
		hideAllDropdowns()
		sketch.dropdown_projects.visible = true
		
	sketch.hotspot_your_projects.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 0, 0, 0)
		
	sketch.hotspot_starred_projects.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 0, 1, 0)
		
	sketch.hotspot_explore_projects.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 0, 2, 0)
		
	sketch.hotspot_customers_stack_story.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('project', 0, 0, 0)
	
	sketch.hotspot_activity.onClick =>
		hideAllDropdowns()
		sketch.dropdown_activity.visible = true
	
	sketch.hotspot_activity_your_projects.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 1, 0, 0)
		
	sketch.hotspot_groups.onClick =>
		hideAllDropdowns()
		sketch.dropdown_groups.visible = true
		
	sketch.hotspot_your_groups.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 2, 0, 0)
		
	sketch.hotspot_explore_groups.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 2, 1, 0)
		
	sketch.hotspot_customers.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('group', 0, 0, 0)
		
	sketch.hotspot_customers_organisation.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('subgroup', 0, 0, 0)
	
	sketch.hotspot_more.onClick =>
		hideAllDropdowns()
		sketch.dropdown_more.visible = true
		
	sketch.hotspot_milestones.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 3, 0, 0)
	
	sketch.hotspot_snippets.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('global', 4, 0, 0)
		
	
	sketch.hotspot_assigned_issues.onMouseOver =>
		sketch.tooltip_assgined_issues.visible = true
	sketch.hotspot_assigned_issues.onMouseOut =>
		sketch.tooltip_assgined_issues.visible = false
	sketch.hotspot_assigned_issues.onClick =>
		environmentController.switchToEnvironment('dashboard', 0, null, 0)
		
	sketch.hotspot_assgined_merge_requests.onMouseOver =>
		sketch.tooltip_assigned_merge_requets.visible = true
	sketch.hotspot_assgined_merge_requests.onMouseOut =>
		sketch.tooltip_assigned_merge_requets.visible = false
	sketch.hotspot_assgined_merge_requests.onClick =>
		environmentController.switchToEnvironment('dashboard', 1, null, 0)
	
	sketch.hotspot_todos.onMouseOver =>
		sketch.tooltip_todos.visible = true
	sketch.hotspot_todos.onMouseOut =>
		sketch.tooltip_todos.visible = false
	sketch.hotspot_todos.onClick =>
		environmentController.switchToEnvironment('dashboard', 2, null, 0)
		
	sketch.hotspot_profile_picture.onClick =>
		hideAllDropdowns()
		sketch.dropdown_profile.visible = true
		
	sketch.hotspot_profile.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('profile', 0, 0, 0)
		
	sketch.hotspot_settings.onClick =>
		hideAllDropdowns()
		environmentController.switchToEnvironment('user_settings', 0, 0, 0)
	
	sketch.dropdown_add_button_project.onClick =>
	sketch.dropdown_add_button_global.onClick =>
	sketch.dropdown_projects.onClick =>
	sketch.dropdown_activity.onClick =>
	sketch.dropdown_groups.onClick =>
	sketch.dropdown_more.onClick =>
	sketch.dropdown_profile.onClick =>
	
	ContentAreaContainer.layer.onClick =>
		hideAllDropdowns()

# Hide All Dropdowns Function
hideAllDropdowns = () ->
	sketch.dropdown_add_button_project.visible = false
	sketch.dropdown_add_button_global.visible = false
	sketch.dropdown_projects.visible = false
	sketch.dropdown_activity.visible = false
	sketch.dropdown_groups.visible = false
	sketch.dropdown_more.visible = false
	sketch.dropdown_profile.visible = false	
	
	sketch.tooltip_assgined_issues.visible = false
	sketch.tooltip_assigned_merge_requets.visible = false
	sketch.tooltip_todos.visible = false

# Map Sketch layers to environment breadcrumbs
sketch_breadcrumbs = {
	'group' : sketch.breadcrumbs_group,
	'subgroup' : sketch.breadcrumbs_subgroup,
	'project' : sketch.breadcrumbs_project,
	'global' : sketch.breadcrumbs_global,
	'profile' : sketch.breadcrumbs_user_profile,
	'user_settings' : sketch.breadcrumbs_settings
	'dashboard' : sketch.breadcrumbs_dashboard
}


# Main
environmentController = new EnvironmentController(gitlab_tree, sketch.top_bar.height, sketch_breadcrumbs)
environmentController.addControllerReferenceToEnvironments()
environmentController.setUpInitialState(initial_state)
ContentAreaContainer.layer.sendToBack()

sketch.assets.backgroundColor = "transparent"

addGlobalHotspots(environmentController)