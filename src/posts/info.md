---
title: Github management
description: use local and remote git for your version control
date: '2023-12-14'
categories:
  - git
  - github
published: true
---

# Local

Git can be used locally to have more control over your files and
be able to reroll to previous versions.
This can be very useful when some days everything fails and you can easily
make it all undone with this simple tool.

## Initialize

Initializing at first (locally) doesn't pose much of a challenge.
first you need to initialize git. - git init

## Add to stage

This will add git as a tool inside the folder.
next there are some basic commands to use to make your initial commit.

```bash
git add .
```

which adds all the files in the folder to the stage, the stage is not yet added
files, but they are qeued to be commited.
Replacing the '.' at the end with a filename will only add that specific file, you can also chain the
files behind each other to stage multiple specific files.

## Initial commit

the next fase will be to actually commit the changes made and finalize the commit. - git push -m 'initial commit'
the -m flag is optional but considered best practise. also try to describe
the message well, so when you're trying to find a commit you can easily trace it back.

## Git restore

so how do you use this new tool to your advantage.
Well if I start making changes now, and later down the road i think my first version was the better version.
I can easily reroll all I did and start from the latest pushed version. -

```bash
git restore <file path>
```

Watch the path here if there's any folders above you will have to specify.
So after making changes and saving your file (but not pushing it to stage),
you can reroll you're latest commit.

Although there are other ways to het your files out of the staging zone you can also use git restore for this. - git restore --staged `<file path>`.
This will give you the option to remove certain files from stage.

## More basic commands

some other basic commands you can use locally are:

    -git status                     Get the status
    -git rm --cached                To unstage
    -git log                        Get the log
    -git <command> -help            See all the available options for the specific command
    -git help --all                 See all possible commands (warning: long list)

## New branch

    -git branch <branchname>        Creates a new branch.
    -git branch                     Shows branches and current branch with a *.
    -git checkout <branchname>      Switches branch
    -git status                     Also shows branch.

## Merge branch

```bash
git checkout main
git merge <branch name>
```

This will merge the requested branch name to the main branch.

```bash
git branch -d <branch name>
```

To delete the branch, since main and requested branch name are now the same.

### Merge conflict

We are not on the main branch at the start of this example.
So after changing some files in a branch you stage and commit the changes.

```bash
git add --all
git commit -m "added new images and changed index.html"
```

Changing to the main branch and auto merging previous branch

```bash
git checkout master
git merge <branch name>
```

This could result in a conflict and you will not be able to auto-merge

```bash
git status
```

will help you out here to see what's going on. Open the file which has the conflict according to the git status.
You can open both files and find out what's the reason behind the conflict.
Afterwards you will try and resolve the merging conflict by:

```bash
git add <filename>
git status
```

This will tell you there's no more conflict hopefully.

```bash
git commit -m 'merged message after fixing conflict'
```

# Remote Repository a.k.a. github.

so pushing to github has changed a lot lately. This builds in extra security measures.
It's sometimes difficult to find because of all the outdated awnsers
still floating around on the internet. I'd suggest getting your info from the github docs ofcourse.
After using "git push origin master"

I've gotten the below error, and at first didn't know how to solve it.

    Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
    git@github.com: Permission denied (publickey).
    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.

Solving it meant you had to make sure your machine can identify itself towards github.
This is dont via ssh keys and sounds intimidating maybe, but it's really quite simple.
just follow the steps on github docs here
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

In short you can open the terminal and
-ssh-keygen -t ed25519 -C <your_email@example.com>
this will generate ssh key according to an algoritm.
Afterwhich it will prompt you to save a file.
Pressing enter will save the file in the recommended place.

Now we will have to start the ssh agent from the terminal.

```bash
eval "$(ssh-agent -s)"
```

and it will return agent pid `<some number>`.
Than add the file name you just made, for me it was like below.

```bash
ssh-add ~/.ssh/id_ed25519
```

Now all we have to do is store is ssh key in our github account as well.
This is done in the setting menu after pressing your profile picture on github.
In the setting menu you will find a header saying "Access".
Press the "SSH and GPG keys" tab where you will find a button to add a new ssh key.
Now all we need is the actual key, go back to the terminal and

```bash
cat ~/.ssh/id_ed25519.pub
```

and copy all that comes back, paste it in your github new ssh key tab and fill in a clear reference.
Save it, and that should solve the acces rights issue we had.

So after that done we should now be able to

```bash
git remote add origin git@github.com:<username>/<repo>.git
git branch -M main
git push -u origin main
```

And the error shouldn't come back and your files should be uploaded.

Do note that you shouldn't ever put sensitive information inside uploaded files.
To make sure you wont please check out .gitignore DOTenv or these article(s).
