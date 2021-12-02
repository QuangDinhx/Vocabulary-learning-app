using Abp.Runtime.Session;
using Quizlet_Fake.Lessons;
using Quizlet_Fake.LogCoursesPermission;
using Quizlet_Fake.Participations;
using Quizlet_Fake.Permissions;
using Quizlet_Fake.Tags;
using Quizlet_Fake.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;


namespace Quizlet_Fake.Courses
{
    public class CourseAppService :
        CrudAppService<
            Course,//Defines CRUD methods
            CourseDto, //Used to show 
            Guid, //Primary key of the  entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CourseCreateUpdateDto>, //Used to create/update 
        ICourseAppService, ITransientDependency
    {
        //public IAbpSession AbpSession { get; set; }
        public CourseAppService(IRepository<Course, Guid> repository, ICurrentUser currentUser, IRepository<ParticipationPermission> y, IRepository<AppUser, Guid> z, IRepository<Tag> tag, IRepository<Lesson, Guid> m) : base(repository)
        {
            this._currentUser = currentUser;
            this._repository = repository;
            this._parRepo = y;
            this.usersRepository = z;
            this.lessonrepository = m;
            this._Tagrepository = tag;
            GetPolicyName = Quizlet_FakePermissions.Courses.Default;
            GetListPolicyName = Quizlet_FakePermissions.Courses.Default;
        }
        private readonly ICurrentUser _currentUser;
        private readonly IRepository<Course, Guid> _repository;
        private readonly IRepository<ParticipationPermission> _parRepo;
        private readonly IRepository<AppUser, Guid> usersRepository;
        private readonly IRepository<Lesson, Guid> lessonrepository;
        private readonly IRepository<Tag> _Tagrepository;
        public async override Task<CourseDto> CreateAsync(CourseCreateUpdateDto input)
        {
            input.UserId = (Guid)_currentUser.Id;
            //input.UserId = AbpSession.UserId;
            var x = base.CreateAsync(input);
            var rs = await x;
            var per = new CoursesPermissionCreateUpdateDto();
            per.UserId = input.UserId;
            per.CourseId = rs.Id;
            var ins = ObjectMapper.Map<CoursesPermissionCreateUpdateDto, ParticipationPermission>(per);
            await _parRepo.InsertAsync(ins);
            return rs;
        }



        public ListResultDto<CourseDto> GetCoursesOfUser(String? text)
        {
            var course = new List<Course>();
            var res = new List<CourseDto>();
            Guid id = (Guid)_currentUser.Id;
            if (text == null)
            {

                course = _repository.Where(p => p.UserId == id).ToList();
                res = ObjectMapper.Map<List<Course>, List<CourseDto>>(course);
            }
            else
            {
                course = _repository.Where(p => p.UserId == id && p.Name.Contains(text)).ToList();
                res = ObjectMapper.Map<List<Course>, List<CourseDto>>(course);
            }
           // res = convertForAddingTag(res,null);
            return new ListResultDto<CourseDto>(res);
        }
        public async Task<ListResultDto<CourseDto>> GetListssss(String? text, FilterCourseDto? filterCourse, String?  nameTags)
        {
            var query = from course in Repository
                        join
                user in usersRepository on course.CreatorId equals user.Id

                        select new { course, user };
            if (text == null)
            {
                query = from course in Repository
                        join
                user in usersRepository on course.CreatorId equals user.Id
                        orderby course.Name
                        select new { course, user };
            }
            else if (text != null)
            {
                query = from course in Repository
                        join
           user in usersRepository on course.CreatorId equals user.Id
                        where course.Name.Contains(text)
                        select new { course, user };
            }

            var queryResult = await AsyncExecuter.ToListAsync(query);
            var courseDtos = queryResult.Select(x =>
            {
                var courseDto = ObjectMapper.Map<Course, CourseDto>(x.course);
                courseDto.AuthorName = x.user.UserName;
                var lesson = lessonrepository.Where(m => m.CourseId == x.course.Id).Count();
                courseDto.LessonNumber = lesson;
                return courseDto;
            }).ToList();

            switch (filterCourse.Sortby)
            {
                case sortby.a_z:
                    courseDtos = courseDtos.OrderBy(o => o.Name).ToList();


                    break;

                case sortby.z_a:
                    courseDtos = courseDtos.OrderByDescending(o => o.CreationTime).ToList();
                    break;
                default:
                    break;


            }

            switch (filterCourse.Price)
            {

                case price.lowTohigh:
                    courseDtos = courseDtos.OrderBy(o => o.Price).ToList();
                    break;
                case price.highTolow:
                    courseDtos = courseDtos.OrderByDescending(o => o.Price).ToList();
                    break;
            }

            

           courseDtos = convertForAddingTag(courseDtos, nameTags);
            return new ListResultDto<CourseDto>(courseDtos);

        }


        public Task Xoa(Guid id)

        {
            var course = _repository.FirstOrDefault(x => x.Id == id);
            if (course.UserId == _currentUser.Id)
            {
                return base.DeleteAsync(id);
            }
            return base.DeleteAsync(new Guid());

        }
        public override Task<CourseDto> UpdateAsync(Guid id, CourseCreateUpdateDto input)
        {


            var course = _repository.FirstOrDefault(x => x.Id == id);
            if (course.UserId == _currentUser.Id)
            {
                input.PublishDate = course.PublishDate;
                input.UserId = course.UserId;
                return base.UpdateAsync(id, input);
            }
            return base.UpdateAsync(new Guid(), input);
        }


        public TagDto GetTagbyId(int TagTd)
        {

            var tag = _Tagrepository.Where(x => x.TagId == TagTd).FirstOrDefault();

            return ObjectMapper.Map<Tag, TagDto>(tag);
        }

        public List<TagDto> getListTagOfCourseFromString(String chuoi)
        {


            string[] strlist = chuoi.Split(',');

            List<TagDto> rs = new List<TagDto>();


           for (int i = 0; i < strlist.Count(); i++)
            {
                //GetTagbyId(Int32.Parse(strlist[i]))
                rs.Add(GetTagbyId(Int32.Parse(strlist[i])));
            }
            return rs;
        }

        public List<CourseDto> convertForAddingTag(List<CourseDto> list, string tagNames) {

            int count = list.Count();

            if (tagNames == "" || tagNames == null)
            {
                for (int i = 0; i < count; i++)
                {
                    var course = _repository.First(x => x.Id == list[i].Id);

                    list[i].ListTag = getListTagOfCourseFromString(course.TagNames);
                }
                return list;
            }
            else
            {

                var newlist = new List<CourseDto>();
                for (int i = 0; i < count; i++)
                {
                    var course = _repository.First(x => x.Id == list[i].Id);

                    if(checkListTag(tagNames,course.TagNames))
                    {
                        list[i].ListTag = getListTagOfCourseFromString(course.TagNames);
                        newlist.Add(list[i]);
                        
                    }
                }
                return newlist;

            }
            
            
        }



        public bool checkListTag(string filterTag, string courseTag)
        {
            String[] filterTagList = filterTag.Split(',');
            String[] courseTagList = courseTag.Split(',');

            for(int k = 0; k < filterTagList.Count(); k ++)
            {
                if(!courseTagList.Contains(filterTagList[k]))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
