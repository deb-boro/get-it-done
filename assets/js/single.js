var issueContainerEl = document.querySelector('#issues-container')
var repoNameEl = document.querySelector('#repo-name')

var displayIssues = function (issues) {
  for (var i = 0; i < issues.length; i++) {
    if (issues.length === 0) {
      issueContainerEl.textContent = 'This repo has no open issues!'
      return
    }
    // create a link element to take users to the issue on github

    for (var i = 0; i < issues.length; i++) {
      var repoName = issues[i].user.login + ' / ' + issues[i].name
      var issueEl = document.createElement('a')
      issueEl.classList =
        'list-item flex-row justify-space-between align-center'
      issueEl.setAttribute('href', issues[i].html_url)
      issueEl.setAttribute('target', '_blank')

      //create span to hold issue title
      var titleEl = document.createElement('span')
      titleEl.textContent = issues[i].title

      // append to container
      issueEl.appendChild(titleEl)

      // create a type element
      var typeEl = document.createElement('span')

      // check if issue is an actual issue or a pull request
      if (issues[i].pull_request) {
        typeEl.textContent = '(Pull request)'
      } else {
        typeEl.textContent = '(Issue)'
      }

      // append to container
      issueEl.appendChild(typeEl)
      issueContainerEl.appendChild(issueEl)
    }
  }
}
var getRepoIssues = function (repo) {
  var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc'

  fetch(apiUrl).then(function (Response) {
    if (Response.ok) {
      Response.json().then(function (data) {
        displayIssues(data)
        if (Response.headers.get('Link')) {
          console.log('repo has more than 30 issues')
        }
      })
    } else {
      alert('there was a problem with your request!')
    }
  })
}
var getRepoName = function () {
  var queryString = document.location.search
  var repoName = queryString.split('=')[1]
  if (repoName) {
    repoNameEl.textContent = repoName
    getRepoIssues(repoName)
  } else {
    document.location.replace('./index.html')
  }
}
getRepoName()
