<img src="https://user-images.githubusercontent.com/4745789/131798196-7946c290-b663-48ac-b7ae-bf9de27bb20c.png" alt="Obsidian HackerNews Plugin" width="400" />

# Obsidian HackerNews [![GitHub tag (Latest by date)](https://img.shields.io/github/v/tag/arpitbbhayani/obsidian-hackernews)](https://github.com/arpitbbhayani/obsidian-hackernews/releases) ![GitHub all releases](https://img.shields.io/github/downloads/arpitbbhayani/obsidian-hackernews/total)

The plugin periodically fetches and displays top stories from [HackerNews](https://news.ycombinator.com/) in an [Obsidian](https://obsidian.md) pane. Some of the best stories, blogs, news, and resources are shared on [HackerNews](https://news.ycombinator.com/), and this plugin helps stay updated while using Obsidian.

# Features

 - Periodically fetches a random top story from HackerNews.
 - You can save the story as a note allowing you to revisit it again.

# Installation

 - Open the *Command Palette* (default: `ctrl` + `p`),
 - Search for *Open HackerNews* and run the command.
 - You will see that a new View appears in the right Sidebar of Obsidian.
 - Drag and drop like any other pane and power-up your Obsidian.


# Is this plugin for you?

This plugin is for you if you use [Obsidian](https://obsidian.md) and
 - are a passionate engineer
 - want to discover amazing articles, resources, and projects
 - want to stay updated with the happenings in the tech world


# Why I created this plugin?
I love reading technical articles and stay updated with the latest happenings in the tech world, and I find [HackerNews](https://news.ycombinator.com/) ideal for this. I have read some of the best articles and found amazing open source libraries through it, and hence I always like to keep a clock eye on HackerNews.

On Mac, I used [YCombinator Plugin](https://github.com/martinsirbe/ycombinator-bitbar) on [BitBar](https://xbarapp.com/), which is very similar and shows one top story from [HackerNews](https://news.ycombinator.com/) in the top menu bar. If the title is enticing enough, I can always learn more about it by clicking the item. This is a great way for me to discover the best resources out there.

Recently, I switched to a Windows machine and found it not having a similar utility; plus, writing a widget for Windows is a mess. When I discovered Obsidian, I found myself using it quite frequently. So I thought of creating a plugin similar to the [YCombinator Plugin](https://github.com/martinsirbe/ycombinator-bitbar) to fetch random top story from HackerNews and show it to me in the side pane.

This is how this Plugin was conceptualized, and now my Obsidian workspace looks like this.

![Obsidian Screenshot for HackerNews Plugin](https://user-images.githubusercontent.com/4745789/131978712-718691dd-57bb-48ea-bd4b-d8e182ec6c16.PNG)

# Privacy
This plugin makes calls to the following APIs to fetch the top stories from HackerNews
 - [https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty](https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty)
 - [https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty](https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty)

The API calls are mere GET calls that do not pass any client-side information through the API to `hacker-news.firebaseio.com`.  

# About me

Hello, I am [Arpit Bhayani](https://arpitbhayani.me/) - a CS Engineer, Educator, and a Polymath. I love everything around Computer Science, Programming, Mathematics, and Art. You can find me on [Twitter](https://twitter.com/arpit_bhayani), tweeting mostly about nerdy stuff.

In January 2020, I started my [newsletter](https://arpitbhayani.me/newsletter), where I write and share an essay about Distributed Systems, System Design, Programming languages internals, and deep dives on some super-clever algorithms. The newsletter currently has close to **2000+** subscribers.

I have been running a niche [Cohort-based Course](https://arpitbhayani.me/masterclass) on System Design to help engineering become better at designing  _scalable_,  _fault-tolerant_, and  _highly available_  systems.

You can choose to support me in everything I do by sponsoring this plugin.

<a  href="https://www.buymeacoffee.com/arpitbhayani"><img  src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=arpitbhayani&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>

