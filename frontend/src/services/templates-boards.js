import { utilService } from "./util.service"

export const templateService = {
    getDevTemplate,
    getMarketingTemplate,
    getPRMTemplate,
    getCRMTemplate
}

function getDevTemplate() {
    console.log('hiiiiiii');
    return {
        "title": "Development Board",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "statuses": [
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "label": "done",
                "bgColor": "#00c875"
            },
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "label": "working on it",
                "bgColor": "#fdab3d"
            },
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "label": "stuck",
                "bgColor": "#e2445c"
            },
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "priorities": [
            {
                "label": "critical ⚠️",
                "bgColor": "#333333"
            },
            {
                "label": "high",
                "bgColor": "#401694"
            },
            {
                "label": "medium",
                "bgColor": "#5559df"
            },
            {
                "label": "low",
                "bgColor": "#579bfc"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "labelStatuses": [
            {
                "label": "label 1",
                "bgColor": "#9aadbd"
            },
            {
                "label": "label 2",
                "bgColor": "#0086c0"
            },
            {
                "label": "label 3",
                "bgColor": "#9d99b9"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "groups": [
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "title": "Feature Enhancements",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Committed Feature",
                        "status": "done",
                        "priority": "critical ⚠️",
                        "members": [],
                        "labelStatus": "label 3",
                        "dueDate": 1589983468418,
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988412373,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "critical ⚠️"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988409892
                            },
                            {
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "id": utilService.makeId(),
                        "title": "Committed Feature",
                        "status": "done",
                        "priority": "low",
                        "members": [],
                        "isChecked": false,
                        "dueDate": 1674988648,
                        "labelStatus": "label 3",
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988660370,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "low"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988655917,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Committed Plan board",
                        "status": "working on it",
                        "priority": "medium",
                        "number": 0,
                        "members": [],
                        "labelStatus": "label 2",
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988414377,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "medium"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988411061,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "working on it"
                            }
                        ]
                    }
                ],
                "style": "#4eccc6"
            },
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "title": "Bugs",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Committed Bug",
                        "status": "stuck",
                        "priority": "high",
                        "members": [],
                        "labelStatus": "label 3",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "stuck"
                            }
                        ]
                    }
                ],
                "style": "#9cd326"
            },
            {
                "id": utilService.makeId(),
                "id": utilService.makeId(),
                "title": "Team",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Commited Team Task",
                        "status": "working on it",
                        "priority": "medium",
                        "members": [],
                        "labelStatus":
                            "label 1",
                        "dueDate": 1589983468418,
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988251849,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "medium"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988242845,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "working on it"
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Commited Team Task",
                        "status": "done",
                        "priority": "critical ⚠️",
                        "members": [],
                        "labelStatus": "label 2",
                        "dueDate": 1589983468418,
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988254184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "critical ⚠️"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988246466,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ]
                    }
                ],
                "style": "#e2445c"
            }
        ],
        "cmpsOrder": ["MEMEBER_PICKER", "STATUS_PICKER", "DATE_PICKER", "PRIORITY_PICKER", "TEXT_LABEL", "LABEL_STATUS_PICKER", "NUMBER_PICKER"],
        "owner": null
    }
}
function getMarketingTemplate() {
    return {
        "title": "Marketing Board",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "statuses": [
            {
                "id": utilService.makeId(),
                "label": "done",
                "bgColor": "#00c875"
            },
            {
                "id": utilService.makeId(),
                "label": "working on it",
                "bgColor": "#fdab3d"
            },
            {
                "id": utilService.makeId(),
                "label": "stuck",
                "bgColor": "#e2445c"
            },
            {
                "id": utilService.makeId(),
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "priorities": [
            {
                "label": "critical ⚠️",
                "bgColor": "#333333"
            },
            {
                "label": "high",
                "bgColor": "#401694"
            },
            {
                "label": "medium",
                "bgColor": "#5559df"
            },
            {
                "label": "low",
                "bgColor": "#579bfc"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "labelStatuses": [
            {
                "label": "label 1",
                "bgColor": "#9aadbd"
            },
            {
                "label": "label 2",
                "bgColor": "#0086c0"
            },
            {
                "label": "label 3",
                "bgColor": "#9d99b9"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "groups": [
            {
                "id": utilService.makeId(),
                "title": "Q1 initiatives",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Increasing conversion rates",
                        "status": "working on it",
                        "priority": "low",
                        "members": [],
                        "labelStatus": "label 2",
                        "dueDate": 1589983468418,
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988412373,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "critical ⚠️"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988409892
                            },
                            {
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Competitor analysis",
                        "status": "done",
                        "priority": "high",
                        "members": [],
                        "isChecked": false,
                        "dueDate": 1674988648,
                        "labelStatus": "label 3",
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988660370,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "low"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988655917,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ]
                    },
                ],
                "style": "#037f4c"
            },
            {
                "id": utilService.makeId(),
                "title": "Q2 initiatives",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Rethinking our logo",
                        "status": "stuck",
                        "priority": "critical ⚠️",
                        "members": [],
                        "labelStatus": "label 1",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "stuck"
                            }
                        ],
                    },
                ],
                "style": "#a25ddc"
            },
        ],
        "cmpsOrder": ["MEMEBER_PICKER", "STATUS_PICKER", "DATE_PICKER", "PRIORITY_PICKER", "TEXT_LABEL", "LABEL_STATUS_PICKER", "NUMBER_PICKER"],
        "owner": null
    }
}
function getPRMTemplate() {
    return {
        "title": "Project Management Board",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "statuses": [
            {
                "id": utilService.makeId(),
                "label": "done",
                "bgColor": "#00c875"
            },
            {
                "id": utilService.makeId(),
                "label": "working on it",
                "bgColor": "#fdab3d"
            },
            {
                "id": utilService.makeId(),
                "label": "stuck",
                "bgColor": "#e2445c"
            },
            {
                "id": utilService.makeId(),
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "priorities": [
            {
                "label": "critical ⚠️",
                "bgColor": "#333333"
            },
            {
                "label": "high",
                "bgColor": "#401694"
            },
            {
                "label": "medium",
                "bgColor": "#5559df"
            },
            {
                "label": "low",
                "bgColor": "#579bfc"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "labelStatuses": [
            {
                "label": "label 1",
                "bgColor": "#9aadbd"
            },
            {
                "label": "label 2",
                "bgColor": "#0086c0"
            },
            {
                "label": "label 3",
                "bgColor": "#9d99b9"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "groups": [
            {
                "id": utilService.makeId(),
                "title": "Team 1",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Work on inbox reconfiguration",
                        "status": "stuck",
                        "priority": "high",
                        "members": [],
                        "labelStatus": "label 1",
                        "dueDate": 1589983468418,
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988412373,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "critical ⚠️"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988409892
                            },
                            {
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Social Media integrations",
                        "status": "done",
                        "priority": "critical ⚠️",
                        "members": [],
                        "isChecked": false,
                        "dueDate": 1674988648,
                        "labelStatus": "label 3",
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988660370,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "low"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988655917,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ]
                    },
                ],
                "style": "#579bfc"
            },
            {
                "id": utilService.makeId(),
                "title": "Team 2",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "AB test templates",
                        "status": "default",
                        "priority": "low",
                        "members": [],
                        "labelStatus": "label 2",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "stuck"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Create wizard after user sign up linking directly to the template store",
                        "status": "done",
                        "priority": "medium",
                        "members": [],
                        "labelStatus": "label 1",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "stuck"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Update package v2.56",
                        "status": "done",
                        "priority": "critical ⚠️",
                        "members": [],
                        "labelStatus": "label 3",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "working on it",
                                "toStatus": "done"
                            }
                        ],
                    },
                ],
                "style": "#bb3354"
            },
            {
                "id": utilService.makeId(),
                "title": "Team 3",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Work on template store infrastructure",
                        "status": "working on it",
                        "priority": "high",
                        "members": [],
                        "labelStatus": "default",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "stuck",
                                "toStatus": "done"
                            }
                        ],
                    },
                ],
                "style": "#fdab3d"
            },
        ],
        "cmpsOrder": ["MEMEBER_PICKER", "STATUS_PICKER", "DATE_PICKER", "PRIORITY_PICKER", "TEXT_LABEL", "LABEL_STATUS_PICKER", "NUMBER_PICKER"],
        "owner": null
    }
}
function getCRMTemplate() {
    return {
        "title": "CRM Board",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "statuses": [
            {
                "id": utilService.makeId(),
                "label": "done",
                "bgColor": "#00c875"
            },
            {
                "id": utilService.makeId(),
                "label": "working on it",
                "bgColor": "#fdab3d"
            },
            {
                "id": utilService.makeId(),
                "label": "stuck",
                "bgColor": "#e2445c"
            },
            {
                "id": utilService.makeId(),
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "priorities": [
            {
                "label": "critical ⚠️",
                "bgColor": "#333333"
            },
            {
                "label": "high",
                "bgColor": "#401694"
            },
            {
                "label": "medium",
                "bgColor": "#5559df"
            },
            {
                "label": "low",
                "bgColor": "#579bfc"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "labelStatuses": [
            {
                "label": "label 1",
                "bgColor": "#9aadbd"
            },
            {
                "label": "label 2",
                "bgColor": "#0086c0"
            },
            {
                "label": "label 3",
                "bgColor": "#9d99b9"
            },
            {
                "label": "default",
                "bgColor": "#c4c4c4"
            }
        ],
        "groups": [
            {
                "id": utilService.makeId(),
                "title": "Active Projects",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Campaign management",
                        "status": "done",
                        "priority": "medium",
                        "members": [],
                        "labelStatus": "label 3",
                        "dueDate": 1589983468418,
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988412373,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "critical ⚠️"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988409892
                            },
                            {
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Create a website",
                        "status": "working on it",
                        "priority": "critical ⚠️",
                        "members": [],
                        "isChecked": false,
                        "dueDate": 1674988648,
                        "labelStatus": "label 1",
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988660370,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "low"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988655917,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Design logos",
                        "status": "default",
                        "priority": "high",
                        "members": [],
                        "isChecked": false,
                        "dueDate": 1674988648,
                        "labelStatus": "label 3",
                        "number": 0,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988660370,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "low"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988655917,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "done"
                            }
                        ]
                    },
                ],
                "style": "#579bfc"
            },
            {
                "id": utilService.makeId(),
                "title": "Finished Projects",
                "archivedAt": 1589983468418,
                "isCollapsed": false,
                "isChecked": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Market analysis",
                        "status": "default",
                        "priority": "medium",
                        "members": [],
                        "labelStatus": "default",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "stuck"
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "isChecked": false,
                        "title": "Video production",
                        "status": "done",
                        "priority": "low",
                        "members": [],
                        "labelStatus": "label 3",
                        "number": 0,
                        "dueDate": 1589983468418,
                        "txt": "",
                        "activity": [
                            {
                                "id": utilService.makeId(),
                                "time": 1674988428184,
                                "byUser": "Guest",
                                "type": "update_priority",
                                "fromPriority": "default",
                                "toPriority": "high"
                            },
                            {
                                "id": utilService.makeId(),
                                "time": 1674988423469,
                                "byUser": "Guest",
                                "type": "update_status",
                                "fromStatus": "default",
                                "toStatus": "stuck"
                            }
                        ],
                    },
                ],
                "style": "#037f4c"
            },
        ],
        "cmpsOrder": ["MEMEBER_PICKER", "STATUS_PICKER", "DATE_PICKER", "PRIORITY_PICKER", "TEXT_LABEL", "LABEL_STATUS_PICKER", "NUMBER_PICKER"],
        "owner": null
    }
}