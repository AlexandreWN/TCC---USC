using Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Dash
{
    public int Id { get; private set; }
    public DateTime ActualDate { get; private set; }
    public int IdSprint { get; private set; }
    public int IdUserProject { get; private set; }
    public int DreamTime { get; private set; }
    public int ActualTime { get; private set; }
    public int RevewTime { get; private set; }

    public Sprint Sprint { get; private set; } = default!;
    public UserProject UserProject { get; private set; } = default!;

    public Dash()
    {

    }

    public Dash(DateTime actualDate, int idSprint, int idUserProject, int dreamTime, int actualTime, int revewTime)
    {
        this.ActualDate = actualDate;
        this.IdSprint = idSprint;
        this.IdUserProject = idUserProject;
        this.DreamTime = dreamTime;
        this.ActualTime = actualTime;
        this.RevewTime = revewTime;
    }

    public static Dash Create(DateTime ActualDate, int IdSprint, int IdUserProject, int DreamTime, int ActualTime, int RevewTime)
    {
        var dash = new Dash(ActualDate, IdSprint, IdUserProject, DreamTime, ActualTime, RevewTime);

        return dash;
    }

    public static Dash Create(DashDto dto)
    {
        var dash = new Dash(dto.ActualDate, dto.IdSprint, dto.IdUserProject, dto.DreamTime, dto.ActualTime, dto.RevewTime);

        return dash;
    }

    public async Task<object> GetSprintStatusAsync(int idSprint)
    {
        List<float> idealTimes = new List<float>();
        List<float> reviewTimeTasks = new List<float>();
        List<object> realTimeTasks = new List<object>();

        using var context = new Context();

        var sprintData = await context.Sprint
            .Where(sp => sp.Id == idSprint)
            .GroupJoin(
                context.Story,
                sp => sp.Id,
                st => st.IdSprint,
                (sp, stories) => new
                {
                    sp.Id,
                    sp.InitionDate,
                    sp.EndDate,
                    Stories = stories.Select(st => new
                    {
                        Id = st.Id,
                        Tasks = context.Task
                            .Where(t => t.IdStory == st.Id)
                            .Select(t => new
                            {
                                Id = t.Id,
                                t.DurationTime,
                                t.EndDate,
                            })
                            .ToList()
                    }).ToList()
                })
            .FirstAsync();

        var totalTasksTime = sprintData.Stories
        .SelectMany(story => story.Tasks)
        .Sum(task => task.DurationTime);

        var srpintDates = GetDatesBetween(sprintData.InitionDate, sprintData.EndDate);

        float timePerDay = (float)totalTasksTime / srpintDates.Count;

        float tempTotalTimes = totalTasksTime;

        for (int i = 0; i < srpintDates.Count; i++)
        {
            idealTimes.Add(tempTotalTimes);
            tempTotalTimes -= timePerDay;
        }

        tempTotalTimes = totalTasksTime;

        for (int i = 0; i < srpintDates.Count; i++)
        {
            if (tempTotalTimes <= 0)
            {
                reviewTimeTasks.Add(0);
                continue;
            }
            reviewTimeTasks.Add(tempTotalTimes);
            tempTotalTimes -= timePerDay * 2;
        }

        var endDateTotalDuration = sprintData.Stories
            .SelectMany(story => story.Tasks)
            .GroupBy(task => task.EndDate.Date)
            .Select(group => new
            {
                EndDate = group.Key,
                TotalDuration = group.Sum(task => task.DurationTime)
            })
            .ToList();

        tempTotalTimes = totalTasksTime;

        for (int i = 0; i < srpintDates.Count; i++)
        {
            var dateExists = endDateTotalDuration.Any(ed => ed.EndDate.Date == srpintDates[i].Date);
            if (dateExists)
            {
                tempTotalTimes -= endDateTotalDuration.Where(ed => ed.EndDate.Date == srpintDates[i].Date).Sum(ed => ed.TotalDuration);
            }
            realTimeTasks.Add(tempTotalTimes);
        }

        var objectData = new
        {
            Days = srpintDates,
            IdealTimeTasks = idealTimes,
            ReviewTimeTasks = reviewTimeTasks,
            RealTimeTasks = realTimeTasks,
        };

        return objectData;
    }

    public static List<DateTime> GetDatesBetween(DateTime startDate, DateTime endDate)
    {
        List<DateTime> dates = new List<DateTime>();
        for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
        {
            dates.Add(date.Date);
        }
        return dates;
    }
}
