
using System;

using Volo.Abp.Users;

using Volo.Abp.DependencyInjection;

using Quizlet_Fake.Courses;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using Quizlet_Fake.Lessons;
using System.Threading.Tasks;
using System.Linq;
using Quizlet_Fake.Participations;
using System.Collections.Generic;
using Quizlet_Fake.Permissions;
using Quizlet_Fake.Managers;
using Quizlet_Fake.Learns;
using Volo.Abp.Data;

namespace Quizlet_Fake.Tags
{
    public class TagAppService : CrudAppService<
              Tag,//Defines CRUD methods
              TagDto, //Used to show 
              Guid, //Primary key of the  entity
              PagedAndSortedResultRequestDto, //Used for paging/sorting
              TagCreateOrUpdate>, //Used to create/update 
          ITagAppService, ITransientDependency
    {
        private readonly IRepository<Tag, Guid> _Tagrepository;
        public TagAppService(IRepository<Tag, Guid> repository) : base(repository)
        {
            this._Tagrepository = repository;
        }


        
        public override async Task<TagDto> CreateAsync(TagCreateOrUpdate input)
        {
            // var lastTag = _Tagrepository.LastOrDefault(); deo chay ???


            var lastTag = _Tagrepository.OrderByDescending( p => p.TagId).First();
            
            if(lastTag != null)
            {
                return await base.CreateAsync(new TagCreateOrUpdate(lastTag.TagId + 1, input.Name));

            }
            return await base.CreateAsync(new TagCreateOrUpdate(0, input.Name));

        }

        public Task Xoa(String name )

        {
            var tag = _Tagrepository.FirstOrDefault(x => x.Name.Contains(name));
            if (tag != null )
            {
                return base.DeleteAsync(tag.Id);
            }
            return base.DeleteAsync(new Guid());

        }




    }
}
